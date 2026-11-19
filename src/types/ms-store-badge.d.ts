import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** Microsoft's official Store badge web component (https://get.microsoft.com/badge). */
interface MsStoreBadgeAttributes {
  productid: string;
  productname?: string;
  "window-mode"?: "direct" | "full";
  theme?: "auto" | "dark" | "light";
  size?: "small" | "medium" | "large";
  language?: string;
  animation?: "on" | "off";
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ms-store-badge": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
        MsStoreBadgeAttributes;
    }
  }
}
