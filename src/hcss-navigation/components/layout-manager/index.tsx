import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactNode, ComponentType } from "react";
import { Navigation } from "./main-navigation";
import { CollapseListeners } from "../../models/collapse-listener";
import { PageContent } from "./page-content";

interface LayoutManagerProps {
  topOffset?: number;
  flyoutOnHover: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  shouldHideGlobalNavShadow: boolean;
  showContextualNavigation: boolean;
  horizontalGlobalNav: boolean;
  alternateFlyoutBehaviour: boolean;
  globalNavigation: ComponentType<{}>;
  productNavigation: ComponentType<{}>;
  containerNavigation?: ComponentType<{}>;
  children: ReactNode;
}
export const LayoutManager = ({
  topOffset,
  flyoutOnHover,
  fullWidthFlyout,
  hideNavVisuallyOnCollapse,
  shouldHideGlobalNavShadow,
  showContextualNavigation,
  horizontalGlobalNav,
  alternateFlyoutBehaviour,
  globalNavigation,
  productNavigation,
  containerNavigation,
  onExpandStart,
  onExpandEnd,
  onCollapseEnd,
  onCollapseStart,
  children
}: LayoutManagerProps & CollapseListeners) => {
  const pageRef = useRef<HTMLDivElement>();
  const toggleButtonRef = useRef<HTMLButtonElement>();
  const [flyoutIsOpen, setFlyoutIsOpen] = useState(false);

  return (
    <LayoutContainer topOffset={topOffset}>
      <Navigation
        topOffset={topOffset}
        flyoutOnHover={flyoutOnHover}
        flyoutIsOpen={flyoutIsOpen}
        setFlyoutIsOpen={o => setFlyoutIsOpen(o)}
        fullWidthFlyout={fullWidthFlyout}
        hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}
        shouldHideGlobalNavShadow={shouldHideGlobalNavShadow}
        showContextualNavigation={showContextualNavigation}
        horizontalGlobalNav={horizontalGlobalNav}
        alternateFlyoutBehaviour={alternateFlyoutBehaviour}
        globalNavigation={globalNavigation}
        productNavigation={productNavigation}
        containerNavigation={containerNavigation}
        toggleButtonRef={toggleButtonRef}
        pageRef={pageRef}
      />
      <PageContent
        flyoutIsOpen={flyoutIsOpen}
        showContextualNavigation={showContextualNavigation}
        horizontalGlobalNav={horizontalGlobalNav}
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

interface Props {
  topOffset?: number;
}

const LayoutContainer = styled.div<Props>`
  display: flex;
  flex-direction: row;
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px
  height: calc(100vh - var(--top-offset));
  margin-top: var(--top-offset);
  background-color: blue;
`;
