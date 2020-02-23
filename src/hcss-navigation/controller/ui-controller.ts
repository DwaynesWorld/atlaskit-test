import { useState } from "react";
import { useLocalStorage } from "hcss-hooks";
import { UIState } from "../models/ui-state";
import { Resize } from "../models/resize";

import {
  CONTENT_NAV_WIDTH,
  PRODUCT_NAV_WIDTH_CACHE_KEY,
  NAV_COLLAPSED_CACHE_KEY,
  NAV_COLLAPSED_STORE_CACHE_KEY
} from "../common/constants";

export interface UIController {
  uiState: {
    isResizing: boolean;
    isResizeDisabled: boolean;
    productNavWidth: number;
    isCollapsed: boolean;
  };
  collapse: () => void;
  expand: () => void;
  toggleCollapse: () => void;
  manualResizeStart: (resize: Resize) => void;
  manualResizeEnd: (resize: Resize) => void;
  enableResize: () => void;
  disableResize: () => void;
}

export const useUIController = (initialState: UIState): UIController => {
  const [isResizing, setIsResizing] = useState(false);

  const [isResizeDisabled, setIsResizeDisabled] = useState(
    initialState.isResizeDisabled || false
  );

  const [productNavWidth, setProductNavWidth] = useLocalStorage(
    PRODUCT_NAV_WIDTH_CACHE_KEY,
    initialState.productNavWidth || CONTENT_NAV_WIDTH
  );

  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    NAV_COLLAPSED_CACHE_KEY,
    initialState.isCollapsed || false
  );

  const [isCollapsedStore, setIsCollapsedStore] = useLocalStorage(
    NAV_COLLAPSED_STORE_CACHE_KEY,
    isCollapsed
  );

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
  };

  const manualResizeStart = ({ productNavWidth, isCollapsed }: Resize) => {
    if (isResizeDisabled) return;
    setIsResizing(true);
    setProductNavWidth(productNavWidth);
    setIsCollapsed(isCollapsed);
  };

  const manualResizeEnd = ({ productNavWidth, isCollapsed }: Resize) => {
    if (isResizeDisabled) return;
    setIsResizing(false);
    setProductNavWidth(productNavWidth);
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
    uiState: { isResizing, isResizeDisabled, productNavWidth, isCollapsed },
    collapse,
    expand,
    toggleCollapse,
    manualResizeStart,
    manualResizeEnd,
    enableResize,
    disableResize
  };
};
