import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { useState, useRef, Fragment, ComponentType } from "react";
import { LayoutEventProvider } from "../../contexts/layout-event-context";
import { useNavigationControllerContext } from "../../contexts/navigation-controller-context";
import { RenderBlocker } from "../../common/render-blocker";
import { ComposedGlobalNavigation } from "./composed-global-navigation";
import { ComposedDynamicNavigation } from "./composed-dynamic-navigation";
import { ResizeTransition } from "../resize-transition";
import { ResizeControl } from "../resize-control";

import {
  DYNAMIC_NAV_WIDTH_COLLAPSED,
  DYNAMIC_NAV_WIDTH_FLYOUT,
  NAVIGATION_LAYER_ZINDEX,
  ALTERNATE_FLYOUT_DELAY,
  FLYOUT_DELAY,
  HORIZONTAL_GLOBAL_NAV_HEIGHT
} from "hcss-navigation/common/constants";

type ReactMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface NavigationProps {
  topOffset?: number;
  flyoutOnHover: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  shouldHideGlobalNavShadow: boolean;
  showContextualNavigation: boolean;
  horizontalGlobalNav: boolean;
  alternateFlyoutBehaviour: boolean;
  flyoutIsOpen: boolean;
  setFlyoutIsOpen: (open: boolean) => void;
  pageRef: MutableRefObject<HTMLDivElement | undefined>;
  toggleButtonRef: MutableRefObject<HTMLButtonElement | undefined>;
  globalNavigation: ComponentType<{}>;
  moduleNavigation: ComponentType<{}>;
  contextNavigation?: ComponentType<{}>;
}
export const Navigation = ({
  topOffset,
  flyoutOnHover,
  flyoutIsOpen,
  setFlyoutIsOpen,
  fullWidthFlyout,
  hideNavVisuallyOnCollapse,
  shouldHideGlobalNavShadow,
  showContextualNavigation,
  horizontalGlobalNav,
  alternateFlyoutBehaviour,
  pageRef,
  toggleButtonRef,
  globalNavigation,
  moduleNavigation,
  contextNavigation
}: NavigationProps) => {
  const navigationRef = useRef<HTMLDivElement>();
  const moduleNavigationRef = useRef<HTMLDivElement>();
  const flyoutTimeout = useRef<number>();
  const controller = useNavigationControllerContext();
  const { uiState, expand } = controller;
  const { isCollapsed, isResizing, moduleNavWidth } = uiState;
  const [itemIsDragging, setItemIsDragging] = useState(false);

  const GlobalNavigation = globalNavigation;

  const navContainerTopOffset = horizontalGlobalNav
    ? HORIZONTAL_GLOBAL_NAV_HEIGHT + (topOffset || 0)
    : topOffset;

  const flyoutWidth = fullWidthFlyout
    ? moduleNavWidth
    : DYNAMIC_NAV_WIDTH_FLYOUT;

  const onMouseOut = ({ currentTarget, relatedTarget }: ReactMouseEvent) => {
    if (!isCollapsed || !flyoutOnHover || !flyoutIsOpen) return;
    if (currentTarget.contains(relatedTarget as Node)) return;
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current);
    setFlyoutIsOpen(false);
  };

  const onMouseOver = ({ currentTarget, relatedTarget }: ReactMouseEvent) => {
    if (!isCollapsed || !flyoutOnHover || flyoutIsOpen) return;
    if (currentTarget.contains(relatedTarget as Node)) return;
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current);

    const delay = alternateFlyoutBehaviour
      ? ALTERNATE_FLYOUT_DELAY
      : FLYOUT_DELAY;

    flyoutTimeout.current = setTimeout(() => setFlyoutIsOpen(true), delay);
  };

  const onMouseLeave = (e: ReactMouseEvent) => {
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current);
  };

  const closeFlyout = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current);
    if (flyoutIsOpen) setFlyoutIsOpen(false);
  };

  return (
    <LayoutEventProvider
      onItemDragStart={() => setItemIsDragging(true)}
      onItemDragEnd={() => setItemIsDragging(false)}>
      {horizontalGlobalNav && (
        <HorizontalNavigationContainer topOffset={topOffset}>
          <GlobalNavigation />
        </HorizontalNavigationContainer>
      )}
      <NavigationContainer
        ref={ref => (navigationRef.current = ref || undefined)}
        topOffset={navContainerTopOffset}
        onMouseOver={alternateFlyoutBehaviour ? onMouseOver : undefined}
        onMouseOut={onMouseOut}
        onMouseLeave={onMouseLeave}>
        <NavigationContainerMask
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
                    globalNavigation={globalNavigation}
                    contextNavigation={contextNavigation}
                    topOffset={topOffset}
                    shouldHideGlobalNavShadow={shouldHideGlobalNavShadow}
                    alternateFlyoutBehaviour={alternateFlyoutBehaviour}
                    closeFlyout={closeFlyout}
                  />
                </RenderBlocker>
              )}

              <ResizeTransition
                from={[
                  showContextualNavigation ? DYNAMIC_NAV_WIDTH_COLLAPSED : 0
                ]}
                in={
                  showContextualNavigation
                    ? !isCollapsed || flyoutIsOpen
                    : false
                }
                properties={["width"]}
                to={[flyoutIsOpen ? flyoutWidth : moduleNavWidth]}
                userIsDragging={isResizing}>
                {({ transitionStyle, transitionState }) => (
                  <ComposedDynamicNavigation
                    moduleNavigationRef={moduleNavigationRef}
                    moduleNavigation={moduleNavigation}
                    contextNavigation={contextNavigation}
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
        </NavigationContainerMask>
        {showContextualNavigation && (
          <ResizeControl
            controller={controller}
            flyoutOnHover={flyoutOnHover}
            flyoutIsOpen={flyoutIsOpen}
            isGrabAreaDisabled={itemIsDragging}
            toggleButtonRef={toggleButtonRef}
            onMouseOverButtonBuffer={
              alternateFlyoutBehaviour ? closeFlyout : undefined
            }
            mutationRefs={[
              { ref: pageRef, property: "padding-left" },
              { ref: moduleNavigationRef, property: "width" }
            ]}
          />
        )}
      </NavigationContainer>
    </LayoutEventProvider>
  );
};

interface NavigationContainerProps {
  topOffset?: number;
}

const NavigationContainer = styled.div<NavigationContainerProps>`
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px

  position: fixed;
  top: var(--top-offset);
  bottom: 0px;
  left: 0px;
  z-index: ${NAVIGATION_LAYER_ZINDEX};
  background-color: red;

  &:hover .navigation-resize-button {
    opacity: 1;
  }
`;

const HorizontalNavigationContainer = styled.div<NavigationContainerProps>`
  --top-offset: ${props => (props.topOffset ? props.topOffset : 0)}px

  position: fixed;
  top: var(--top-offset);
  width: 100%;
  z-index: calc(${NAVIGATION_LAYER_ZINDEX} + 1);
`;

interface NavigationContainerMaskProps {
  disableInteraction?: boolean;
}

const NavigationContainerMask = styled.div<NavigationContainerMaskProps>`
  --interaction: ${p => (p.disableInteraction ? "none" : "auto")};

  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
  pointer-events: var(--interaction);
  user-select: var(--interaction);
`;
