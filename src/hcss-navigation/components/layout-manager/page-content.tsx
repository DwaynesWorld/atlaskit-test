import React, { MutableRefObject, ReactNode } from "react";
import styled from "styled-components";
import { useNavigationControllerContext } from "../../context/navigation-controller-context";
import { ResizeTransition } from "../resize-transition";
import { CollapseListeners } from "../../models/collapse-listener";
import { isTransitioning } from "../resize-transition/helpers";

import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT,
  GLOBAL_NAV_WIDTH,
  HORIZONTAL_GLOBAL_NAV_HEIGHT
} from "hcss-navigation/common/constants";

interface PageContentProps {
  pageRef: MutableRefObject<HTMLDivElement | undefined>;
  flyoutIsOpen: boolean;
  showContextualNavigation: boolean;
  horizontalGlobalNav: boolean;
  children: ReactNode;
}
export const PageContent = ({
  pageRef,
  flyoutIsOpen,
  showContextualNavigation,
  horizontalGlobalNav,
  onExpandStart,
  onExpandEnd,
  onCollapseEnd,
  onCollapseStart,
  children
}: PageContentProps & CollapseListeners) => {
  const controller = useNavigationControllerContext();
  const { isCollapsed, productNavWidth, isResizing } = controller.uiState;

  // prettier-ignore
  const expandedSize = flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth;
  const collapsedSize = 0;
  const leftOffset = horizontalGlobalNav ? 0 : GLOBAL_NAV_WIDTH;
  const topOffset = horizontalGlobalNav ? HORIZONTAL_GLOBAL_NAV_HEIGHT : 0;

  return (
    <ResizeTransition
      in={!isCollapsed}
      from={[CONTENT_NAV_WIDTH_COLLAPSED]}
      to={[showContextualNavigation ? expandedSize : collapsedSize]}
      // TODO: ???
      // productNavWidth={productNavWidth}
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
          leftOffset={leftOffset}
          topOffset={topOffset}
          style={transitionStyle}>
          {children}
        </PageWrapper>
      )}
    </ResizeTransition>
  );
};

interface WrapperProps {
  disableInteraction: boolean;
  topOffset: number;
  leftOffset: number;
}
const PageWrapper = styled.div<WrapperProps>`
  flex: 1 1 auto;
  margin-top: ${p => p.topOffset}px;
  margin-left: ${p => p.leftOffset}px;
  width: 0;

  --interaction: ${p => (p.disableInteraction ? "none" : "auto")};
  pointer-events: var(--interaction);
  user-select: var(--interaction);
`;
