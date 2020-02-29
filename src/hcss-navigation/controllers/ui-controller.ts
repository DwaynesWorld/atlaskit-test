import { useState } from "react";
import { useLocalStorage } from "hcss-hooks";
import { UIState } from "../models/ui-state";
import { Resize } from "../models/resize";

import {
  DYNAMIC_NAV_WIDTH,
  MODULE_NAV_WIDTH_CACHE_KEY,
  NAV_COLLAPSED_CACHE_KEY,
  NAV_COLLAPSED_STORE_CACHE_KEY
} from "../common/constants";

export interface UIController {
  uiState: {
    isResizing: boolean;
    isResizeDisabled: boolean;
    moduleNavWidth: number;
    flyoutIsOpen: boolean;
    isCollapsed: boolean;
  };
  collapse: () => void;
  expand: () => void;
  toggleCollapse: () => void;
  manualResizeStart: (resize: Resize) => void;
  manualResizeEnd: (resize: Resize) => void;
  enableResize: () => void;
  disableResize: () => void;
  setFlyoutIsOpen: (isOpen: boolean) => void;
}

export const useUIController = (initialState: UIState): UIController => {
  const [flyoutIsOpen, _setFlyoutIsOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const [isResizeDisabled, setIsResizeDisabled] = useState(
    initialState.isResizeDisabled || false
  );

  const [moduleNavWidth, setmoduleNavWidth] = useLocalStorage(
    MODULE_NAV_WIDTH_CACHE_KEY,
    initialState.moduleNavWidth || DYNAMIC_NAV_WIDTH
  );

  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    NAV_COLLAPSED_CACHE_KEY,
    initialState.isCollapsed || false
  );

  const [isCollapsedStore, setIsCollapsedStore] = useLocalStorage(
    NAV_COLLAPSED_STORE_CACHE_KEY,
    isCollapsed
  );

  const setFlyoutIsOpen = (isOpen: boolean) => _setFlyoutIsOpen(isOpen);

  const collapse = () => {
    if (isResizeDisabled) return;
    setIsCollapsed(true);
  };

  const expand = () => {
    if (isResizeDisabled) return;
    setIsCollapsed(false);
  };

  const toggleCollapse = () => {
    const toggle = isCollapsed ? expand : collapse;
    toggle();

    // When we are in a previous state where a hover
    // caused the flyout to open and now it menu has been
    // toggled to stay open. The flyout state should be
    // reset to false.
    if (isCollapsed && flyoutIsOpen) {
      setFlyoutIsOpen(false);
    }
  };

  const manualResizeStart = ({ moduleNavWidth, isCollapsed }: Resize) => {
    if (isResizeDisabled) return;
    setIsResizing(true);
    setmoduleNavWidth(moduleNavWidth);
    setIsCollapsed(isCollapsed);
  };

  const manualResizeEnd = ({ moduleNavWidth, isCollapsed }: Resize) => {
    if (isResizeDisabled) return;
    setIsResizing(false);
    setmoduleNavWidth(moduleNavWidth);
    setIsCollapsed(isCollapsed);
  };

  const enableResize = () => {
    setIsCollapsed(isCollapsedStore);
    setIsResizeDisabled(false);
  };

  const disableResize = () => {
    setIsCollapsedStore(isCollapsed);
    setIsCollapsed(false);
    setIsResizeDisabled(true);
  };

  return {
    uiState: {
      isResizing,
      isResizeDisabled,
      moduleNavWidth,
      isCollapsed,
      flyoutIsOpen
    },
    collapse,
    expand,
    toggleCollapse,
    manualResizeStart,
    manualResizeEnd,
    enableResize,
    disableResize,
    setFlyoutIsOpen
  };
};
