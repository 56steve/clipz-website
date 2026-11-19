/*
 * Browser stand-in for the Clipz desktop backend.
 *
 * The page next to this file is the real Clipz interface, built from the app's
 * own source. In the desktop app it talks to a Rust backend through Tauri; on
 * the website there is no backend, so this file answers the same calls from a
 * small in-memory clip list. Nothing here is sent anywhere, and nothing is
 * written to the visitor's clipboard except when they paste a clip on purpose.
 */
(function () {
  "use strict";

  var now = Math.floor(Date.now() / 1000);

  function seed() {
    return [
      { id: "d1", content: "https://github.com/56steve/clipz", source_app: "Chrome", category: "link", is_sensitive: false, is_pinned: true, created_at: now - 40, paste_count: 3 },
      { id: "d2", content: "const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);", source_app: "VS Code", category: "code", is_sensitive: false, is_pinned: false, created_at: now - 190, paste_count: 1 },
      { id: "d3", content: "Standup notes: ship the launch post Tuesday, update the Store listing, record the demo.", source_app: "Notes", category: "text", is_sensitive: false, is_pinned: false, created_at: now - 600, paste_count: 0 },
      { id: "d4", content: "🔒 Password Protected", source_app: "1Password", category: "sensitive", is_sensitive: true, is_pinned: false, created_at: now - 1500, paste_count: 2 },
      { id: "d5", content: "SELECT id, title FROM clips WHERE category = 'code' ORDER BY created_at DESC LIMIT 20;", source_app: "TablePlus", category: "code", is_sensitive: false, is_pinned: false, created_at: now - 3600, paste_count: 5 },
      { id: "d6", content: "https://tauri.app/start/", source_app: "Safari", category: "link", is_sensitive: false, is_pinned: false, created_at: now - 7200, paste_count: 0 },
      { id: "d7", content: "Hey! Can you send me the invoice for October when you get a chance?", source_app: "Messages", category: "text", is_sensitive: false, is_pinned: false, created_at: now - 9000, paste_count: 1 },
      { id: "d8", content: "git rebase -i HEAD~3 && git push --force-with-lease origin feature/notch", source_app: "Terminal", category: "code", is_sensitive: false, is_pinned: false, created_at: now - 11000, paste_count: 2 },
      { id: "d9", content: "🔒 Password Protected", source_app: "Bitwarden", category: "sensitive", is_sensitive: true, is_pinned: false, created_at: now - 16000, paste_count: 1 }
    ];
  }

  var secrets = { d4: "correct-horse-battery-staple", d9: "Tr0ub4dor&3-demo" };
  var clips = seed();
  var counter = 100;
  var listeners = {};

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function ordered() {
    return clips.slice().sort(function (a, b) {
      return (Number(b.is_pinned) - Number(a.is_pinned)) || (b.created_at - a.created_at);
    });
  }

  function find(id) {
    for (var i = 0; i < clips.length; i += 1) if (clips[i].id === id) return clips[i];
    return null;
  }

  function emit(event, payload) {
    (listeners[event] || []).forEach(function (handlerId) {
      var callback = window["_" + handlerId];
      if (typeof callback === "function") callback({ event: event, id: 0, payload: payload });
    });
  }

  var commands = {
    get_clips: function (args) { return clone(ordered().slice(0, (args && args.limit) || 50)); },
    search_clips: function (args) {
      var query = String((args && args.query) || "").toLowerCase();
      if (!query) return clone(ordered());
      return clone(ordered().filter(function (clip) {
        return !clip.is_sensitive && clip.content.toLowerCase().indexOf(query) !== -1;
      }));
    },
    toggle_pin: function (args) {
      var clip = find(args.id);
      if (!clip) return false;
      clip.is_pinned = !clip.is_pinned;
      return clip.is_pinned;
    },
    delete_clip: function (args) {
      clips = clips.filter(function (clip) { return clip.id !== args.id; });
      return null;
    },
    copy_to_clipboard: function (args) {
      var clip = args && args.id ? find(args.id) : null;
      var text = (args && args.content) || (clip ? (clip.is_sensitive ? secrets[clip.id] : clip.content) : "");
      if (clip) clip.paste_count += 1;
      try {
        if (navigator.clipboard && text) navigator.clipboard.writeText(text).catch(function () {});
      } catch (e) { /* clipboard permission denied: the demo still works */ }
      window.parent.postMessage({ type: "clipz:copied" }, "*");
      return null;
    },
    get_clip_content: function (args) { var clip = find(args.id); return clip ? clip.content : null; },
    reveal_sensitive: function (args) { return secrets[args.id] || ""; },
    get_paste_history: function () { return []; },
    get_global_shortcut: function () { return ""; },
    extract_clip_ocr: function () { return null; },
    "plugin:event|listen": function (args) {
      (listeners[args.event] = listeners[args.event] || []).push(args.handler);
      return args.handler;
    }
  };

  window.__TAURI_INTERNALS__ = {
    metadata: { currentWindow: { label: "main" }, currentWebview: { windowLabel: "main", label: "main" } },
    transformCallback: function (callback) {
      var id = Math.floor(Math.random() * 1e9);
      window["_" + id] = callback;
      return id;
    },
    unregisterCallback: function () {},
    convertFileSrc: function (path) { return path; },
    invoke: function (command, args) {
      var handler = commands[command];
      return Promise.resolve(handler ? handler(args || {}) : null);
    }
  };
  window.__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener: function () {} };

  /* ---- Website behaviour: keep the drawer open like a floating window ---- */
  var nativeWindowAdd = window.addEventListener;
  window.addEventListener = function (type) {
    if (type === "blur") return; // clicking the page around the demo must not close it
    return nativeWindowAdd.apply(this, arguments);
  };

  var nativeElementAdd = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function (type) {
    if (type === "mouseleave" && this.id === "notch-shell") return; // no close-on-leave
    return nativeElementAdd.apply(this, arguments);
  };

  var nativeDocumentAdd = document.addEventListener;
  document.addEventListener = function (type, listener, options) {
    if (type === "click" && typeof listener === "function") {
      var original = listener;
      listener = function (event) {
        var target = event.target;
        if (target === document.documentElement || target === document.body) return; // blank space
        return original.call(this, event);
      };
    }
    return nativeDocumentAdd.call(this, type, listener, options);
  };

  /* ---- Messages from the page that embeds the demo ---- */
  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "clipz:add" && data.clip) {
      var id = "d" + (counter += 1);
      var clip = {
        id: id,
        content: data.clip.content,
        source_app: data.clip.source_app || "Clipboard",
        category: data.clip.category,
        is_sensitive: data.clip.category === "sensitive",
        is_pinned: false,
        created_at: Math.floor(Date.now() / 1000),
        paste_count: 0
      };
      if (data.clip.secret) secrets[id] = data.clip.secret;
      clips.push(clip);
      emit("new-clip", clone(clip));
    }

    if (data.type === "clipz:reset") {
      clips = seed();
      emit("paste-event", { target_app: "Clipz" });
    }
  });

  /* ---- Open the drawer once the app has started, as if summoned ---- */
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      var shell = document.getElementById("notch-shell");
      var toggle = document.getElementById("toggle-expand-btn");
      if (shell && toggle && shell.classList.contains("state-pill")) toggle.click();
    }, 700);
  });
})();
