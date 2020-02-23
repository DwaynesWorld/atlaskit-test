import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { useState, useRef, Fragment, ComponentType } from "react";
import { LayoutEventProvider } from "../../context/layout-event-context";
import { useNavigationControllerContext } from "../../context/navigation-controller-context";
import { ContainerMask } from "../container-mask";
import { RenderBlocker } from "../../common/render-blocker";
import { ComposedGlobalNavigation } from "./composed-global-navigation";
import { ComposedContainerNavigation } from "./composed-container-navigation";
import { ResizeTransition } from "../resize-transition";
import { ResizeControl } from "../resize-control";

import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT,
  NAVIGATION_LAYER_ZINDEX
} from "hcss-navigation/common/constants";

type ReactMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface NavigationProps {
  topOffset?: number;
  flyoutOnHover: boolean;
  flyoutIsOpen: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  shouldHideGlobalNavShadow: boolean;
  showContextualNavigation: boolean;
  horizontalGlobalNav: boolean;
  alternateFlyoutBehaviour: boolean;
  pageRef: MutableRefObject<HTMLDivElement | undefined>;
  toggleButtonRef: MutableRefObject<HTMLButtonElement | undefined>;
  globalNavigation: ComponentType<{}>;
  productNavigation: ComponentType<{}>;
  containerNavigation?: ComponentType<{}>;
}
export const Navigation = ({
  topOffset,
  flyoutOnHover,
  flyoutIsOpen,
  fullWidthFlyout,
  hideNavVisuallyOnCollapse,
  shouldHideGlobalNavShadow,
  showContextualNavigation,
  horizontalGlobalNav,
  alternateFlyoutBehaviour,
  pageRef,
  toggleButtonRef,
  globalNavigation,
  productNavigation,
  containerNavigation
}: NavigationProps) => {
  const navigationRef = useRef<HTMLDivElement>();
  const productRef = useRef<HTMLDivElement>();
  const flyoutTimeout = useRef<NodeJS.Timeout>();
  const { uiState, expand } = useNavigationControllerContext();
  const { isCollapsed, isResizing, productNavWidth } = uiState;
  const [itemIsDragging, setItemIsDragging] = useState(false);

  const flyoutWidth = fullWidthFlyout
    ? productNavWidth
    : CONTENT_NAV_WIDTH_FLYOUT;

  // TODO: Implement FLyout
  const onMouseOut = (e: ReactMouseEvent) => {
    console.log("onMouseOut");
  };
  const onMouseOver = (e: ReactMouseEvent) => {
    console.log("onMouseOver");
  };
  const onMouseLeave = (e: ReactMouseEvent) => {
    console.log("onMouseLeaves");
  };
  const closeFlyout = () => {
    console.log("closeFlyout");
  };

  return (
    <LayoutEventProvider
      onItemDragStart={() => setItemIsDragging(true)}
      onItemDragEnd={() => setItemIsDragging(false)}>
      {/* {horizontalGlobalNav && (
            <HorizontalNavigationContainer topOffset={topOffset}>
              <GlobalNavigation />
            </HorizontalNavigationContainer>
          )} */}
      <NavigationContainer
        ref={ref => (navigationRef.current = ref || undefined)}
        topOffset={topOffset}
        onMouseOver={alternateFlyoutBehaviour ? onMouseOver : undefined}
        onMouseOut={onMouseOut}
        onMouseLeave={onMouseLeave}>
        <ContainerMask
          disableInteraction={itemIsDragging}
          onMouseOver={alternateFlyoutBehaviour ? undefined : onMouseOver}>
          <RenderBlocker blockOnChange itemIsDragging={itemIsDragging}>
            <Fragment>
              {!horizontalGlobalNav && (
                <RenderBlocker
                  blockOnChange={true}
                  isResizing={isResizing}
                  isCollapsed={isCollapsed}
                  flyoutIsOpen={flyoutIsOpen}>
                  <ComposedGlobalNavigation
                    containerNavigation={containerNavigation}
                    globalNavigation={globalNavigation}
                    topOffset={topOffset}
                    shouldHideGlobalNavShadow={shouldHideGlobalNavShadow}
                    alternateFlyoutBehaviour={alternateFlyoutBehaviour}
                    closeFlyout={closeFlyout}
                  />
                </RenderBlocker>
              )}

              <ResizeTransition
                from={[
                  showContextualNavigation ? CONTENT_NAV_WIDTH_COLLAPSED : 0
                ]}
                in={
                  showContextualNavigation
                    ? !isCollapsed || flyoutIsOpen
                    : false
                }
                // TODO: ???
                // productNavWidth={productNavWidth}
                properties={["width"]}
                to={[flyoutIsOpen ? flyoutWidth : productNavWidth]}
                userIsDragging={isResizing}>
                {({ transitionStyle, transitionState }) => (
                  <ComposedContainerNavigation
                    productNavigationRef={productRef}
                    productNavigation={productNavigation}
                    containerNavigation={containerNavigation}
                    flyoutOnHover={flyoutOnHover}
                    isResizing={isResizing}
                    isCollapsed={isCollapsed}
                    transitionStyle={transitionStyle}
                    transitionState={transitionState}
                    hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}
                    expand={expand}
                  />
                )}
              </ResizeTransition>
            </Fragment>
          </RenderBlocker>
        </ContainerMask>
        {showContextualNavigation && (
          <ResizeControl
            flyoutOnHover={flyoutOnHover}
            flyoutIsOpen={flyoutIsOpen}
            isGrabAreaDisabled={itemIsDragging}
            toggleButtonRef={toggleButtonRef}
            onMouseOverButtonBuffer={
              alternateFlyoutBehaviour ? closeFlyout : undefined
            }
            mutationRefs={[
              { ref: pageRef, property: "padding-left" },
              { ref: productRef, property: "width" }
            ]}
          />
        )}
      </NavigationContainer>
    </LayoutEventProvider>
  );
};

interface StyledProps {
  topOffset?: number;
}

const NavigationContainer = styled.div<StyledProps>`
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px

  top: var(--top-offset);
  bottom: 0px;
  left: 0px;
  position: fixed;
  z-index: ${NAVIGATION_LAYER_ZINDEX};
  background-color: red;

  &:hover .navigation-resize-button {
    opacity: 1;
  }
`;
