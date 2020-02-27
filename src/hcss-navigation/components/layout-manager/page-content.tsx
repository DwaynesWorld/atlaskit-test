import React, { MutableRefObject, ReactNode } from "react";
import styled from "styled-components";
import { useNavigationControllerContext } from "../../contexts/navigation-controller-context";
import { ResizeTransition } from "../resize-transition";
import { isTransitioning } from "../resize-transition/helpers";
import { CollapseListeners } from "../../models/collapse-listener";

import {
  DYNAMIC_NAV_WIDTH_COLLAPSED,
  DYNAMIC_NAV_WIDTH_FLYOUT,
  GLOBAL_SIDE_NAV_WIDTH,
  GLOBAL_TOP_NAV_HEIGHT
} from "hcss-navigation/common/constants";

interface PageContentProps {
  pageRef: MutableRefObject<HTMLDivElement | undefined>;
  flyoutIsOpen: boolean;
  showContextualNavigation: boolean;
  useGlobalTopNavigation: boolean;
  useGlobalSideNavigation: boolean;
  children: ReactNode;
}
export const PageContent = ({
  pageRef,
  flyoutIsOpen,
  showContextualNavigation,
  useGlobalTopNavigation,
  useGlobalSideNavigation,
  onExpandStart,
  onExpandEnd,
  onCollapseEnd,
  onCollapseStart,
  children
}: PageContentProps & CollapseListeners) => {
  const controller = useNavigationControllerContext();
  const { isCollapsed, moduleNavWidth, isResizing } = controller.uiState;

  // prettier-ignore
  const expandedSize = flyoutIsOpen ? DYNAMIC_NAV_WIDTH_FLYOUT : moduleNavWidth;
  const collapsedSize = 0;
  const topOffset = useGlobalTopNavigation ? GLOBAL_TOP_NAV_HEIGHT : 0;
  const leftOffset = useGlobalSideNavigation ? GLOBAL_SIDE_NAV_WIDTH : 0;

  return (
    <ResizeTransition
      in={!isCollapsed}
      from={[DYNAMIC_NAV_WIDTH_COLLAPSED]}
      to={[showContextualNavigation ? expandedSize : collapsedSize]}
      properties={["paddingLeft"]}
      userIsDragging={isResizing}
      onExpandStart={onExpandStart}
      onExpandEnd={onExpandEnd}
      onCollapseStart={onCollapseStart}
      onCollapseEnd={onCollapseEnd}>
      {({ transitionStyle, transitionState }) => (
        <PageWrapper
          ref={r => (pageRef.current = r || undefined)}
          disableInteraction={isResizing || isTransitioning(transitionState)}
          topOffset={topOffset}
          leftOffset={leftOffset}
          style={transitionStyle}>
          {children}
        </PageWrapper>
      )}
    </ResizeTransition>
  );
};

interface PageWrapperProps {
  disableInteraction: boolean;
  topOffset: number;
  leftOffset: number;
}
const PageWrapper = styled.div<PageWrapperProps>`
  flex: 1 1 auto;
  margin-top: ${p => p.topOffset}px;
  margin-left: ${p => p.leftOffset}px;
  width: 0;

  --interaction: ${p => (p.disableInteraction ? "none" : "auto")};
  pointer-events: var(--interaction);
  user-select: var(--interaction);
`;
