import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Fragment, MutableRefObject } from "react";
import { Shadow } from "hcss-navigation/common/shadow";
import { ToggleButton } from "./toggle-button";
import { GrabArea } from "./grab-area";
import { UIController } from "hcss-navigation/controller/ui-controller";

import {
  RESIZE_CONTROL_OUTER_WIDTH,
  DYNAMIC_NAV_WIDTH_COLLAPSED,
  GLOBAL_NAV_WIDTH,
  DYNAMIC_NAV_WIDTH,
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
  controller: UIController;
  onMouseOverButtonBuffer?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

interface ResizeControlState {
  didDragOpen: boolean;
  isDragging: boolean;
  mouseIsDown: boolean;
  mouseIsOverGrabArea: boolean;
  showGrabArea: boolean;
  delta: number;
  initialWidth: number;
  initialX: number;
  width: number;
}
export class ResizeControl extends React.Component<
  ResizeControlProps,
  ResizeControlState
> {
  invalidDragAttempted: boolean = false;

  constructor(props: ResizeControlProps) {
    super(props);

    const { controller } = props;
    const { moduleNavWidth } = controller.uiState;

    this.state = {
      didDragOpen: false,
      isDragging: false,
      mouseIsDown: false,
      mouseIsOverGrabArea: false,
      showGrabArea: true,
      delta: 0,
      initialWidth: 0,
      initialX: 0,
      width: moduleNavWidth
    };
  }

  static getDerivedStateFromProps(
    props: ResizeControlProps,
    state: ResizeControlState
  ) {
    const { controller, flyoutOnHover, flyoutIsOpen } = props;
    const { isCollapsed } = controller.uiState;
    const { mouseIsOverGrabArea: current } = state;

    // resolve "hover locking" issue with resize grab area
    if (flyoutOnHover) {
      const showGrabArea = !isCollapsed && !flyoutIsOpen;
      const mouseIsOverGrabArea = showGrabArea ? current : false;

      return {
        mouseIsOverGrabArea,
        showGrabArea
      };
    }

    return null;
  }

  toggleCollapse = () => this.props.controller.toggleCollapse();
  mouseEnterGrabArea = () => this.setState({ mouseIsOverGrabArea: true });
  mouseLeaveGrabArea = () => this.setState({ mouseIsOverGrabArea: false });

  handleResizeStart = (e: ReactMouseEvent) => {
    this.setState({
      initialX: e.pageX,
      mouseIsDown: true
    });

    window.addEventListener("mousemove", this.handleResize);
    window.addEventListener("mouseup", this.handleResizeEnd);
  };

  initializeDrag = (e: MouseEvent) => {
    const { controller } = this.props;
    const { isCollapsed, moduleNavWidth } = controller.uiState;
    const { initialX } = this.state;
    const delta = e.pageX - initialX;

    if (isCollapsed && delta <= 0) {
      this.invalidDragAttempted = true;
      return;
    }

    let initialWidth = moduleNavWidth;
    let didDragOpen = false;

    // If the product nav is collapsed and the user starts
    // dragging it open, we must expand it and drag should
    // start from 0.
    if (isCollapsed) {
      initialWidth = DYNAMIC_NAV_WIDTH_COLLAPSED;
      didDragOpen = true;

      controller.manualResizeStart({
        moduleNavWidth: DYNAMIC_NAV_WIDTH_COLLAPSED,
        isCollapsed: false
      });
    } else {
      controller.manualResizeStart({
        moduleNavWidth,
        isCollapsed
      });
    }

    this.setState({
      didDragOpen,
      initialWidth,
      isDragging: true
    });
  };

  handleResize = (e: MouseEvent) => {
    const { mutationRefs } = this.props;
    const {
      mouseIsDown,
      isDragging,
      initialX,
      initialWidth,
      width
    } = this.state;

    if (!mouseIsDown) return;

    if (!isDragging) {
      this.initializeDrag(e);
      return;
    }

    const r = calculatePositionChange(e.pageX, initialX, initialWidth);
    updateResizeAreaPosition(mutationRefs, width);
    if (e.clientX < 0) {
      this.setState({ width: DYNAMIC_NAV_WIDTH_COLLAPSED });
      this.handleResizeEnd();
    } else {
      this.setState({
        delta: r.delta,
        width: r.width
      });
    }
  };

  handleResizeEnd = () => {
    const { controller, mutationRefs } = this.props;
    const { isCollapsed } = controller.uiState;
    const { isDragging, width, didDragOpen, delta } = this.state;

    const expandThreshold = 24;
    const resizerClicked = !isDragging && !this.invalidDragAttempted;
    const currentWidth = width;

    let publishWidth = currentWidth;
    let shouldCollapse = false;

    if (resizerClicked) {
      publishWidth = Math.max(DYNAMIC_NAV_WIDTH, currentWidth);
      this.toggleCollapse();
    }

    if (publishWidth < DYNAMIC_NAV_WIDTH) {
      publishWidth = DYNAMIC_NAV_WIDTH;

      if (didDragOpen && delta > expandThreshold) {
        shouldCollapse = false;
      } else if (currentWidth < GLOBAL_NAV_COLLAPSE_THRESHOLD) {
        shouldCollapse = true;
      }
    } else {
      shouldCollapse = isCollapsed;
    }

    this.invalidDragAttempted = true;
    this.setState({
      didDragOpen: false,
      isDragging: false,
      mouseIsDown: false,
      width: publishWidth
    });

    controller.manualResizeEnd({
      moduleNavWidth: publishWidth,
      isCollapsed: shouldCollapse
    });

    if (
      currentWidth >= GLOBAL_NAV_COLLAPSE_THRESHOLD &&
      currentWidth < DYNAMIC_NAV_WIDTH
    ) {
      updateResizeAreaPosition(mutationRefs, DYNAMIC_NAV_WIDTH);
    }

    window.removeEventListener("mousemove", this.handleResize);
    window.removeEventListener("mouseup", this.handleResizeEnd);
  };

  render() {
    const {
      flyoutIsOpen,
      isGrabAreaDisabled,
      controller,
      onMouseOverButtonBuffer,
      toggleButtonRef
    } = this.props;

    const {
      isDragging,
      mouseIsDown,
      showGrabArea,
      mouseIsOverGrabArea
    } = this.state;

    const { isResizeDisabled, isCollapsed } = controller.uiState;
    const shadowDirection = flyoutIsOpen ? "to right" : "to left";
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
                onMouseEnter={this.mouseEnterGrabArea}
                onMouseLeave={this.mouseLeaveGrabArea}
                onMouseDown={this.handleResizeStart}
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
                onClick={this.toggleCollapse}
                onMouseDown={e => e.preventDefault()}>
                <Icon />
              </ToggleButton>
            </div>
          </Fragment>
        )}
      </OuterControl>
    );
  }
}

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
          fillRule="evenodd"
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
          fillRule="evenodd"
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
  const minWidth = DYNAMIC_NAV_WIDTH_COLLAPSED;
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
