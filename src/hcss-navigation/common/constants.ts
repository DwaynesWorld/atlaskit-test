export const transitionDuration = "0.22s";
export const transitionDurationMs = 220;
export const transitionTimingFunction = "cubic-bezier(0.2, 0, 0, 1)";

export const RESIZE_TRANSITION_DURATION = 300;
export const FLYOUT_DELAY = 300;
export const ALTERNATE_FLYOUT_DELAY = 200;
export const DYNAMIC_NAV_WIDTH = 240;
export const DYNAMIC_NAV_WIDTH_FLYOUT = 232;
export const DYNAMIC_NAV_WIDTH_COLLAPSED = 20;
export const GLOBAL_TOP_NAV_HEIGHT = 45;
export const GLOBAL_SIDE_NAV_WIDTH = 64;
export const GLOBAL_NAV_COLLAPSE_THRESHOLD = 200;
export const NAVIGATION_LAYER_ZINDEX = 200;

const CACHE_KEY = "hcss.navigation.ui.state";
export const MODULE_NAV_WIDTH_CACHE_KEY = CACHE_KEY + ".module.nav.width";
export const NAV_COLLAPSED_STORE_CACHE_KEY = CACHE_KEY + ".collapsed.store";
export const NAV_COLLAPSED_CACHE_KEY = CACHE_KEY + ".collapsed";

export const RESIZE_CONTROL_HANDLE_OFFSET = 4;
export const RESIZE_CONTROL_HANDLE_WIDTH = 2;
export const RESIZE_CONTROL_INNER_WIDTH = 20;
export const RESIZE_CONTROL_OUTER_WIDTH =
  RESIZE_CONTROL_INNER_WIDTH + RESIZE_CONTROL_HANDLE_OFFSET;

export const SCROLL_HINT_HEIGHT = 2;
export const SCROLL_HINT_SPACING = 16;
export const SCROLL_BAR_SIZE =
  (typeof window !== "undefined" &&
    window.navigator.userAgent.indexOf("Gecko") >= 0) ||
  (typeof window !== "undefined" &&
    window.navigator.userAgent.indexOf("AppleWebKit") >= 0)
    ? 0
    : 30;
