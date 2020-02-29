import React, { useRef } from "react";
import styled from "styled-components";
import { ReactNode, ComponentType } from "react";
import { Navigation } from "./navigation";
import { CollapseListeners } from "../../models/collapse-listener";
import { PageContent } from "./page-content";

export interface LayoutManagerProps extends CollapseListeners {
  topOffset?: number;
  flyoutOnHover: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  showGlobalSideNavShadow: boolean;
  useDynamicNavigation: boolean;
  alternateFlyoutBehaviour: boolean;
  globalTopNavigation?: ComponentType<{}>;
  globalSideNavigation?: ComponentType<{}>;
  moduleNavigation: ComponentType<{}>;
  contextNavigation?: ComponentType<{}>;
  children: ReactNode;
}
export const LayoutManager = ({
  topOffset,
  flyoutOnHover,
  fullWidthFlyout,
  hideNavVisuallyOnCollapse,
  showGlobalSideNavShadow,
  useDynamicNavigation,
  alternateFlyoutBehaviour,
  globalTopNavigation,
  globalSideNavigation,
  moduleNavigation,
  contextNavigation,
  onExpandStart,
  onExpandEnd,
  onCollapseEnd,
  onCollapseStart,
  children
}: LayoutManagerProps) => {
  const pageRef = useRef<HTMLDivElement>();
  const toggleButtonRef = useRef<HTMLButtonElement>();

  return (
    <LayoutContainer className="layout-container" topOffset={topOffset}>
      <Navigation
        topOffset={topOffset}
        flyoutOnHover={flyoutOnHover}
        fullWidthFlyout={fullWidthFlyout}
        hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}
        showGlobalSideNavShadow={showGlobalSideNavShadow}
        useDynamicNavigation={useDynamicNavigation}
        alternateFlyoutBehaviour={alternateFlyoutBehaviour}
        globalTopNavigation={globalTopNavigation}
        globalSideNavigation={globalSideNavigation}
        moduleNavigation={moduleNavigation}
        contextNavigation={contextNavigation}
        toggleButtonRef={toggleButtonRef}
        pageRef={pageRef}
      />
      <PageContent
        useDynamicNavigation={useDynamicNavigation}
        useGlobalTopNavigation={globalTopNavigation !== undefined}
        useGlobalSideNavigation={globalSideNavigation !== undefined}
        onExpandStart={onExpandStart}
        onExpandEnd={onExpandEnd}
        onCollapseEnd={onCollapseEnd}
        onCollapseStart={onCollapseStart}
        pageRef={pageRef}>
        {children}
      </PageContent>
    </LayoutContainer>
  );
};

interface LayoutContainerProps {
  topOffset?: number;
}

const LayoutContainer = styled.div<LayoutContainerProps>`
  display: flex;
  flex-direction: row;
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px
  height: calc(100vh - var(--top-offset));
  margin-top: var(--top-offset);
`;
