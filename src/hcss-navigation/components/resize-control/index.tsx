import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useState, Fragment, useEffect, MutableRefObject } from "react";
import { useNavigationControllerContext } from "hcss-navigation/context/navigation-controller-context";
import { Shadow } from "hcss-navigation/common/shadow";
import { ToggleButton } from "./toggle-button";
import { GrabArea } from "./grab-area";

import {
  RESIZE_CONTROL_OUTER_WIDTH,
  CONTENT_NAV_WIDTH_COLLAPSED,
  GLOBAL_NAV_WIDTH,
  CONTENT_NAV_WIDTH,
  GLOBAL_NAV_COLLAPSE_THRESHOLD
} from "hcss-navigation/common/constants";

type ReactMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface MutationRef {
  ref: MutableRefObject<HTMLElement | undefined>;
  property: "padding-left" | "width";
}

interface ResizeControlProps {
  flyoutOnHover: boolean;
  flyoutIsOpen: boolean;
  isGrabAreaDisabled: boolean;
  mutationRefs: MutationRef[];
  toggleButtonRef: MutableRefObject<HTMLButtonElement | undefined>;
  onMouseOverButtonBuffer?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}
export const ResizeControl = ({
  flyoutOnHover,
  flyoutIsOpen,
  isGrabAreaDisabled,
  mutationRefs,
  toggleButtonRef,
  onMouseOverButtonBuffer
}: ResizeControlProps) => {
  const shadowDirection = flyoutIsOpen ? "to right" : "to left";
  const controller = useNavigationControllerContext();
  const { productNavWidth, isResizeDisabled, isCollapsed } = controller.uiState;
  const [didDragOpen, setDidDragOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [mouseIsOverGrabArea, setMouseIsOverGrabArea] = useState(false);
  const [showGrabArea, setShowGrabArea] = useState(true);
  const [invalidDragAttempted, setInvalidDragAttempted] = useState(false);
  const [delta, setDelta] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [width, setWidth] = useState(productNavWidth);

  useEffect(() => {
    if (flyoutOnHover) {
      const _showGrabArea = !isCollapsed && !flyoutIsOpen;
      const _mouseIsOverGrabArea = _showGrabArea ? mouseIsOverGrabArea : false;
      setShowGrabArea(_showGrabArea);
      setMouseIsOverGrabArea(_mouseIsOverGrabArea);
    }
  }, [flyoutIsOpen, flyoutOnHover, isCollapsed, mouseIsOverGrabArea]);

  const toggleCollapse = () => controller.toggleCollapse();
  const mouseEnterGrabArea = () => setMouseIsOverGrabArea(true);
  const mouseLeaveGrabArea = () => setMouseIsOverGrabArea(false);

  const handleResizeStart = (e: ReactMouseEvent) => {
    setInitialX(e.pageX);
    setMouseIsDown(true);
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", handleResizeEnd);
  };

  const initializeDrag = (e: MouseEvent) => {
    const delta = e.pageX - initialX;

    if (isCollapsed && delta <= 0) {
      setInvalidDragAttempted(true);
      return;
    }

    let initialWidth = productNavWidth;
    let didDragOpen = false;

    // If the product nav is collapsed and the user starts
    // dragging it open, we must expand it and drag should
    // start from 0.
    if (isCollapsed) {
      initialWidth = CONTENT_NAV_WIDTH_COLLAPSED;
      didDragOpen = true;

      controller.manualResizeStart({
        productNavWidth: CONTENT_NAV_WIDTH_COLLAPSED,
        isCollapsed: false
      });
    } else {
      controller.manualResizeStart({
        productNavWidth,
        isCollapsed
      });
    }

    setDidDragOpen(didDragOpen);
    setInitialWidth(initialWidth);
    setIsDragging(true);
  };

  const handleResize = (e: MouseEvent) => {
    console.log("handleResize", mouseIsDown);

    if (!mouseIsDown) return;

    if (!isDragging) {
      initializeDrag(e);
      return;
    }

    const r = calculatePositionChange(e.pageX, initialX, initialWidth);
    updateResizeAreaPosition(mutationRefs, width);
    if (e.clientX < 0) {
      setWidth(CONTENT_NAV_WIDTH_COLLAPSED);
      handleResizeEnd();
    } else {
      setDelta(r.delta);
      setWidth(r.width);
    }
  };

  const handleResizeEnd = () => {
    const expandThreshold = 24;
    const resizerClicked = !isDragging && !invalidDragAttempted;
    const currentWidth = width;

    let publishWidth = currentWidth;
    let shouldCollapse = false;

    if (resizerClicked) {
      publishWidth = Math.max(CONTENT_NAV_WIDTH, currentWidth);
      toggleCollapse();
    }

    if (publishWidth < CONTENT_NAV_WIDTH) {
      publishWidth = CONTENT_NAV_WIDTH;

      if (didDragOpen && delta > expandThreshold) {
        shouldCollapse = false;
      } else if (currentWidth < GLOBAL_NAV_COLLAPSE_THRESHOLD) {
        shouldCollapse = true;
      }
    } else {
      shouldCollapse = isCollapsed;
    }

    setInvalidDragAttempted(false);
    setDidDragOpen(false);
    setIsDragging(false);
    setMouseIsDown(false);
    setWidth(publishWidth);

    controller.manualResizeEnd({
      productNavWidth: publishWidth,
      isCollapsed: shouldCollapse
    });

    if (
      currentWidth >= GLOBAL_NAV_COLLAPSE_THRESHOLD &&
      currentWidth < CONTENT_NAV_WIDTH
    ) {
      updateResizeAreaPosition(mutationRefs, CONTENT_NAV_WIDTH);
    }

    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", handleResizeEnd);
  };

  const Icon = isCollapsed ? ChevronRight : ChevronLeft;

  return (
    <OuterControl>
      {isDragging && <DragCursor />}
      <Shadow direction={shadowDirection} isBold={mouseIsDown} />
      {!isResizeDisabled && (
        <Fragment>
          {!isGrabAreaDisabled && showGrabArea && (
            <GrabArea
              isBold={mouseIsDown}
              showHandle={mouseIsDown || mouseIsOverGrabArea}
              onMouseEnter={mouseEnterGrabArea}
              onMouseLeave={mouseLeaveGrabArea}
              onMouseDown={handleResizeStart}
            />
          )}
          <div
            onMouseOver={!flyoutIsOpen ? onMouseOverButtonBuffer : undefined}>
            <ToggleButton
              isVisible={isCollapsed || mouseIsDown}
              hasHighlight={mouseIsDown || mouseIsOverGrabArea}
              islargeHitArea={onMouseOverButtonBuffer ? true : false}
              buttonRef={toggleButtonRef}
              aria-expanded={!isCollapsed}
              onClick={toggleCollapse}
              onMouseDown={e => e.preventDefault()}>
              <Icon />
            </ToggleButton>
          </div>
        </Fragment>
      )}
    </OuterControl>
  );
};

const ChevronLeft = () => {
  return (
    <span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation">
        <path
          d="M13.706 9.698a.988.988 0 0 0 0-1.407 1.01 1.01 0 0 0-1.419 0l-2.965 2.94a1.09 1.09 0 0 0 0 1.548l2.955 2.93a1.01 1.01 0 0 0 1.42 0 .988.988 0 0 0 0-1.407l-2.318-2.297 2.327-2.307z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
    </span>
  );
};

const ChevronRight = () => {
  return (
    <span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation">
        <path
          d="M10.294 9.698a.988.988 0 0 1 0-1.407 1.01 1.01 0 0 1 1.419 0l2.965 2.94a1.09 1.09 0 0 1 0 1.548l-2.955 2.93a1.01 1.01 0 0 1-1.42 0 .988.988 0 0 1 0-1.407l2.318-2.297-2.327-2.307z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
    </span>
  );
};

const calculatePositionChange = (
  pageX: number,
  initialX: number,
  initialWidth: number
) => {
  const maxWidth = Math.round((window.innerWidth / 4) * 3);
  const minWidth = CONTENT_NAV_WIDTH_COLLAPSED;
  const adjustedMax = maxWidth - initialWidth - GLOBAL_NAV_WIDTH;
  const adjustedMin = minWidth - initialWidth;
  const delta = Math.max(Math.min(pageX - initialX, adjustedMax), adjustedMin);
  const width = initialWidth + delta;

  return { delta, width };
};

const updateResizeAreaPosition = (refs: MutationRef[], width: number) => {
  refs.forEach(({ property, ref }) => {
    if (ref.current) {
      const newValue = `${width}px`;
      const oldValue = ref.current.style.getPropertyValue(property);
      if (oldValue === newValue) return;

      ref.current.style.setProperty(property, newValue);
    }
  });
};

const OuterControl = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 100%;
  transform: translateZ(0);
  width: ${RESIZE_CONTROL_OUTER_WIDTH}px;
  z-index: 3;
`;

const DragCursor = createGlobalStyle`
  body {
    cursor: ew-resize;
  }
`;
