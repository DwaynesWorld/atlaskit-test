import React from "react";
import deepEqual from "react-fast-compare";
import { Transition } from "react-transition-group";
import { ComponentType, useState, Fragment, useEffect, ReactNode } from "react";
import { ModuleNavigationWrapper } from "./module-navigation-wrapper";
import { ContextNavigationWrapper } from "./context-navigation-wrapper";
import { transitionDurationMs } from "hcss-navigation/common/constants";
import { useIsMounted } from "hcss-navigation/common/use-is-mounted";

interface DynamicNavigationProps {
  isVisible: boolean;
  hideNavVisuallyOnCollapse: boolean;
  contextNavigation?: ComponentType<{}>;
  moduleNavigation: ComponentType<{}>;
}
export const DynamicNavigation = React.memo(
  ({
    isVisible,
    contextNavigation,
    moduleNavigation,
    hideNavVisuallyOnCollapse
  }: DynamicNavigationProps) => {
    const isMounted = useIsMounted();

    const shouldRenderContext = contextNavigation ? true : false;
    const ContextNavigation = contextNavigation || Fragment;
    const ModuleNavigation = moduleNavigation;

    return (
      <Fragment>
        <ModuleNavigationWrapper isVisible={isVisible}>
          <ToggleContent
            isVisible={isVisible}
            hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}>
            <ModuleNavigation />
          </ToggleContent>
        </ModuleNavigationWrapper>
        <Transition
          in={shouldRenderContext}
          timeout={isMounted ? transitionDurationMs : 0}
          mountOnEnter={true}
          unmountOnExit={true}>
          {state => (
            <ContextNavigationWrapper
              isEntering={state === "entering"}
              isExiting={state === "exiting"}
              isVisible={isVisible}>
              <ToggleContent
                isVisible={isVisible}
                hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}>
                <ContextNavigation />
              </ToggleContent>
            </ContextNavigationWrapper>
          )}
        </Transition>
      </Fragment>
    );
  },
  (prev: DynamicNavigationProps, next: DynamicNavigationProps) =>
    !deepEqual(prev, next)
);

interface ToggleContentProps {
  isVisible: boolean;
  hideNavVisuallyOnCollapse: boolean;
  children: ReactNode;
}
const ToggleContent = ({
  isVisible,
  hideNavVisuallyOnCollapse,
  children
}: ToggleContentProps) => {
  if (!hideNavVisuallyOnCollapse && !isVisible) return null;
  return <Fragment>{children}</Fragment>;
};
