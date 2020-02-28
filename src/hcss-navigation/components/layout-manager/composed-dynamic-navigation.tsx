import React, { ComponentType, MutableRefObject } from "react";
import styled from "styled-components";
import { TransitionStatus } from "react-transition-group/Transition";
import { isTransitioning } from "../resize-transition/helpers";
import { DynamicNavigation } from "../dynamic-navigation";
import { DYNAMIC_NAV_WIDTH_COLLAPSED } from "hcss-navigation/common/constants";

interface ComposedDynamicNavigationProps {
  flyoutOnHover: boolean;
  isCollapsed: boolean;
  isResizing: boolean;
  hideNavVisuallyOnCollapse: boolean;
  contextNavigation?: ComponentType<{}>;
  moduleNavigation: ComponentType<{}>;
  transitionState: TransitionStatus;
  transitionStyle: Object;
  moduleNavigationRef: MutableRefObject<HTMLDivElement | undefined>;
  expand: () => void;
}

export const ComposedDynamicNavigation = ({
  contextNavigation,
  flyoutOnHover,
  moduleNavigation,
  transitionState,
  transitionStyle,
  isCollapsed,
  isResizing,
  hideNavVisuallyOnCollapse,
  moduleNavigationRef,
  expand
}: ComposedDynamicNavigationProps) => {
  const isVisible = transitionState !== "exited";
  const disableInteraction = isResizing || isTransitioning(transitionState);

  return (
    <DynamicNavigationWrapper
      key="dynamic-nav-wrapper"
      ref={ref => (moduleNavigationRef.current = ref || undefined)}
      disableInteraction={disableInteraction}
      style={transitionStyle}>
      <DynamicNavigation
        key="dynamic-nav"
        isVisible={isVisible}
        hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}
        moduleNavigation={moduleNavigation}
        contextNavigation={contextNavigation}
      />
      {isCollapsed && !flyoutOnHover && (
        <ContentCollapsed
          role="button"
          tabIndex={-1}
          onClick={expand}
          hasContext={contextNavigation ? true : false}
        />
      )}
    </DynamicNavigationWrapper>
  );
};

interface DynamicNavigationWrapperProps {
  disableInteraction: boolean;
}

const DynamicNavigationWrapper = styled.div<DynamicNavigationWrapperProps>`
  --interaction: ${p => (p.disableInteraction ? "none" : "auto")};

  height: 100%;
  position: relative;
  pointer-events: var(--interaction);
  user-select: var(--interaction);
`;

const ContentCollapsed = styled.div<{ hasContext: boolean }>`
  cursor: pointer;
  outline: 0;
  position: absolute;
  height: 100%;
  width: ${DYNAMIC_NAV_WIDTH_COLLAPSED}px;
  transition: background-color 100ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  &:active {
    background-color: rgba(9, 30, 66, 0.13);
  }
`;
