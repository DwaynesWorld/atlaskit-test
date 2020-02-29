import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { useState, useRef, Fragment, ComponentType } from "react";
import { LayoutEventProvider } from "../../contexts/layout-event-context";
import { useNavigationControllerContext } from "../../contexts/navigation-controller-context";
import { RenderBlocker } from "../../common/render-blocker";
import { ComposedGlobalSideNavigation } from "./composed-global-side-navigation";
import { ComposedDynamicNavigation } from "./composed-dynamic-navigation";
import { ResizeTransition } from "../resize-transition";
import { ResizeControl } from "../resize-control";

import {
  DYNAMIC_NAV_WIDTH_COLLAPSED,
  DYNAMIC_NAV_WIDTH_FLYOUT,
  NAVIGATION_LAYER_ZINDEX,
  ALTERNATE_FLYOUT_DELAY,
  FLYOUT_DELAY,
  GLOBAL_TOP_NAV_HEIGHT
} from "hcss-navigation/common/constants";

type ReactMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface NavigationProps {
  topOffset?: number;
  flyoutOnHover: boolean;
  fullWidthFlyout: boolean;
  hideNavVisuallyOnCollapse: boolean;
  showGlobalSideNavShadow: boolean;
  useDynamicNavigation: boolean;
  alternateFlyoutBehaviour: boolean;
  pageRef: MutableRefObject<HTMLDivElement | undefined>;
  toggleButtonRef: MutableRefObject<HTMLButtonElement | undefined>;
  globalTopNavigation?: ComponentType<{}>;
  globalSideNavigation?: ComponentType<{}>;
  moduleNavigation: ComponentType<{}>;
  contextNavigation?: ComponentType<{}>;
}
export const Navigation = ({
  topOffset,
  flyoutOnHover,
  fullWidthFlyout,
  hideNavVisuallyOnCollapse,
  showGlobalSideNavShadow,
  useDynamicNavigation,
  alternateFlyoutBehaviour,
  pageRef,
  toggleButtonRef,
  globalTopNavigation,
  globalSideNavigation,
  moduleNavigation,
  contextNavigation
}: NavigationProps) => {
  const navigationRef = useRef<HTMLDivElement>();
  const moduleNavigationRef = useRef<HTMLDivElement>();
  const flyoutTimeout = useRef<number>();
  const controller = useNavigationControllerContext();
  const { uiState, expand, setFlyoutIsOpen } = controller;
  const { isCollapsed, isResizing, moduleNavWidth, flyoutIsOpen } = uiState;
  const [itemIsDragging, setItemIsDragging] = useState(false);

  const GlobalTopNavigation = globalTopNavigation;

  const navContainerTopOffset = GlobalTopNavigation
    ? GLOBAL_TOP_NAV_HEIGHT + (topOffset || 0)
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
      {GlobalTopNavigation && (
        <TopNavigationContainer
          className="top-navigation-container"
          topOffset={topOffset}>
          <GlobalTopNavigation />
        </TopNavigationContainer>
      )}
      <NavigationContainer
        className="navigation-container"
        ref={ref => (navigationRef.current = ref || undefined)}
        topOffset={navContainerTopOffset}
        onMouseOver={alternateFlyoutBehaviour ? onMouseOver : undefined}
        onMouseOut={onMouseOut}
        onMouseLeave={onMouseLeave}>
        <NavigationContainerMask
          className="navigation-container-mask"
          disableInteraction={itemIsDragging}
          onMouseOver={alternateFlyoutBehaviour ? undefined : onMouseOver}>
          <RenderBlocker blockOnChange itemIsDragging={itemIsDragging}>
            <Fragment>
              {globalSideNavigation && (
                <RenderBlocker
                  blockOnChange={true}
                  isResizing={isResizing}
                  isCollapsed={isCollapsed}
                  flyoutIsOpen={flyoutIsOpen}>
                  <ComposedGlobalSideNavigation
                    globalSideNavigation={globalSideNavigation}
                    contextNavigation={contextNavigation}
                    topOffset={topOffset}
                    showGlobalSideNavShadow={showGlobalSideNavShadow}
                    alternateFlyoutBehaviour={alternateFlyoutBehaviour}
                    closeFlyout={closeFlyout}
                  />
                </RenderBlocker>
              )}

              <ResizeTransition
                from={[useDynamicNavigation ? DYNAMIC_NAV_WIDTH_COLLAPSED : 0]}
                in={useDynamicNavigation ? !isCollapsed || flyoutIsOpen : false}
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
        {useDynamicNavigation && (
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

  &:hover .toggle-button {
    opacity: 1;
  }
`;

const TopNavigationContainer = styled.div<NavigationContainerProps>`
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
