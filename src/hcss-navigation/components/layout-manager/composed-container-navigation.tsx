import React, { ComponentType, MutableRefObject } from "react";
import styled from "styled-components";
import { TransitionStatus } from "react-transition-group/Transition";
import { isTransitioning } from "../resize-transition/helpers";
import { ContentNavigation } from "../content-navigation";
import { CONTENT_NAV_WIDTH_COLLAPSED } from "hcss-navigation/common/constants";

interface Props {
  flyoutOnHover: boolean;
  isCollapsed: boolean;
  isResizing: boolean;
  hideNavVisuallyOnCollapse: boolean;
  containerNavigation?: ComponentType<{}>;
  productNavigation: ComponentType<{}>;
  transitionState: TransitionStatus;
  transitionStyle: Object;
  productNavigationRef: MutableRefObject<HTMLDivElement | undefined>;
  expand: () => void;
}

export const ComposedContainerNavigation = ({
  containerNavigation,
  flyoutOnHover,
  productNavigation,
  transitionState,
  transitionStyle,
  isCollapsed,
  isResizing,
  hideNavVisuallyOnCollapse,
  productNavigationRef,
  expand
}: Props) => {
  const isVisible = transitionState !== "exited";
  const disableInteraction = isResizing || isTransitioning(transitionState);

  return (
    <ContentNavigationWrapper
      key="product-nav-wrapper"
      ref={ref => (productNavigationRef.current = ref || undefined)}
      disableInteraction={disableInteraction}
      style={transitionStyle}>
      <ContentNavigation
        key="produc-nav"
        container={containerNavigation}
        isVisible={isVisible}
        product={productNavigation}
        hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}
      />
      {isCollapsed && !flyoutOnHover && (
        <ContentCollapsed
          role="button"
          tabIndex={-1}
          onClick={expand}
          hasContainer={containerNavigation ? true : false}
        />
      )}
    </ContentNavigationWrapper>
  );
};

interface StyledProps {
  disableInteraction: boolean;
}

const ContentNavigationWrapper = styled.div<StyledProps>`
  --interaction: ${p => (p.disableInteraction ? "none" : "auto")};

  height: 100%;
  position: relative;
  pointer-events: var(--interaction);
  user-select: var(--interaction);
`;

const ContentCollapsed = styled.div<{ hasContainer: boolean }>`
  cursor: pointer;
  outline: 0;
  position: absolute;
  height: 100%;
  width: ${CONTENT_NAV_WIDTH_COLLAPSED}px;
  transition: background-color 100ms;

  &:hover {
    /* background-color: ${p =>
      p.hasContainer ? "#EBECF0" : "rgba(255, 255, 255, 0.08)"}; */
    background-color: rgba(255, 255, 255, 0.08);
  }

  &:active {
    background-color: rgba(9, 30, 66, 0.13);
  }
`;
