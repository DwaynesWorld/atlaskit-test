import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { ReactNode, ComponentType } from "react";
import { Navigation } from "./navigation";
import { CollapseListeners } from "../../models/collapse-listener";
import { PageContent } from "./page-content";
import { useNavigationControllerContext } from "hcss-navigation/contexts/navigation-controller-context";

export interface LayoutManagerProps extends CollapseListeners {
  topOffset?: number;
  flyoutOnHover: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  shouldHideGlobalNavShadow: boolean;
  showContextualNavigation: boolean;
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
  shouldHideGlobalNavShadow,
  showContextualNavigation,
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
  const controller = useNavigationControllerContext();
  const [flyoutIsOpen, setFlyoutIsOpen] = useState(false);

  useEffect(() => {
    // This happens on button click
    // TODO: Move flyout is open to controller
    if (!controller.uiState.isCollapsed && flyoutIsOpen) {
      setFlyoutIsOpen(false);
    }
  }, [controller.uiState.isCollapsed, flyoutIsOpen]);

  return (
    <LayoutContainer className="layout-container" topOffset={topOffset}>
      <Navigation
        topOffset={topOffset}
        flyoutOnHover={flyoutOnHover}
        flyoutIsOpen={flyoutIsOpen}
        setFlyoutIsOpen={o => setFlyoutIsOpen(o)}
        fullWidthFlyout={fullWidthFlyout}
        hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}
        shouldHideGlobalNavShadow={shouldHideGlobalNavShadow}
        showContextualNavigation={showContextualNavigation}
        alternateFlyoutBehaviour={alternateFlyoutBehaviour}
        globalTopNavigation={globalTopNavigation}
        globalSideNavigation={globalSideNavigation}
        moduleNavigation={moduleNavigation}
        contextNavigation={contextNavigation}
        toggleButtonRef={toggleButtonRef}
        pageRef={pageRef}
      />
      <PageContent
        flyoutIsOpen={flyoutIsOpen}
        showContextualNavigation={showContextualNavigation}
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
