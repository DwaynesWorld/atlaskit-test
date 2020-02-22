import React, {
  useState,
  useRef,
  Fragment,
  ReactChild,
  ComponentType
} from "react";
import { LayoutContainer } from "./layout-container";
import { LayoutEventProvider } from "../../context/layout-event-context";
import { NavigationContainer } from "./navigation-container";
import { useNavigationContext } from "../../context/navigation-context";
import { ContainerMask } from "../container-mask";
import { RenderBlocker } from "../../common/render-blocker";
import { ComposedGlobalNavigation } from "./composed-global-navigation";
import { ResizeTransition } from "../resize-transition";
import {
  CollapseListener,
  ExpandListener
} from "../../models/collapse-listener";
import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT
} from "hcss-navigation/common/constants";

interface LayoutManagerProps {
  topOffset?: number;
  containerNavigation?: ComponentType<{}>;
  globalNavigation: ComponentType<{}>;
  productNavigation: ComponentType<{}>;
  horizontalGlobalNav: boolean;
  alternateFlyoutBehaviour: boolean;
  flyoutOnHover: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  shouldHideGlobalNavShadow?: boolean;
  showContextualNavigation?: boolean;
  children: ReactChild;
  collapseToggleTooltipConent: (
    isCollapsed: boolean
  ) => { text: string; char: string };
}

export const LayoutManager = ({
  topOffset,
  horizontalGlobalNav,
  alternateFlyoutBehaviour,
  containerNavigation,
  globalNavigation,
  shouldHideGlobalNavShadow,
  showContextualNavigation,
  fullWidthFlyout
}: LayoutManagerProps & CollapseListener & ExpandListener) => {
  const containerRef = useRef(null);
  const { uiState } = useNavigationContext();
  const { isCollapsed, isResizing, productNavWidth } = uiState;
  const [itemIsDragging, setItemIsDragging] = useState(false);
  const [flyoutIsOpen, setFlyoutIsOpen] = useState(false);

  const flyoutWidth = fullWidthFlyout
    ? productNavWidth
    : CONTENT_NAV_WIDTH_FLYOUT;

  // TODO: Implement FLyout
  const onMouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};
  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};
  const closeFlyout = () => {};

  return (
    <LayoutContainer>
      <LayoutEventProvider
        onItemDragStart={() => setItemIsDragging(true)}
        onItemDragEnd={() => setItemIsDragging(false)}>
        {/* {horizontalGlobalNav && (
              <HorizontalNavigationContainer topOffset={topOffset}>
                <GlobalNavigation />
              </HorizontalNavigationContainer>
            )} */}
        <NavigationContainer
          ref={containerRef}
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
                  properties={["width"]}
                  to={[flyoutIsOpen ? flyoutWidth : productNavWidth]}
                  userIsDragging={isResizing}
                  productNavWidth={productNavWidth}>
                  {/* {({ transitionStyle, transitionState }) => (
                    <ComposedContainerNavigation
                      containerNavigation={containerNavigation}
                      datasets={datasets}
                      experimental_flyoutOnHover={EXPERIMENTAL_FLYOUT_ON_HOVER}
                      experimental_hideNavVisuallyOnCollapse={
                        !!EXPERIMENTAL_HIDE_NAV_VISUALLY_ON_COLLAPSE
                      }
                      expand={navigationUIController.expand}
                      productNavigation={productNavigation}
                      transitionState={transitionState}
                      transitionStyle={transitionStyle}
                      isCollapsed={isCollapsed}
                      isResizing={isResizing}
                      getNavRef={this.getNavRef}
                      view={view}
                    />
                  )} */}
                </ResizeTransition>
              </Fragment>
            </RenderBlocker>
          </ContainerMask>
        </NavigationContainer>
      </LayoutEventProvider>
    </LayoutContainer>
  );
};
