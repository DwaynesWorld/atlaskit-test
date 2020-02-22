import React from "react";
import deepEqual from "react-fast-compare";
import { Transition } from "react-transition-group";
import { ComponentType, useState, Fragment, useEffect, ReactNode } from "react";
import { ProductNavigation } from "./product-navigation";
import { ContainerNavigation } from "./container-navigation";
import { transitionDurationMs } from "hcss-navigation/common/constants";
import { useIsMounted } from "hcss-navigation/common/is-mounted";

interface Props {
  container?: ComponentType<{}>;
  isVisible: boolean;
  product: ComponentType<{}>;
  hideNavVisuallyOnCollapse: boolean;
}
export const ContentNavigation = React.memo(
  ({
    isVisible,
    container,
    product: Product,
    hideNavVisuallyOnCollapse
  }: Props) => {
    const isMounted = useIsMounted();
    const [cachedContainer, setCachedContainer] = useState<
      ComponentType<any>
    >();
    const shouldRenderContainer = container ? true : false;
    const Container = cachedContainer || Fragment;

    useEffect(() => {
      if (container && container !== cachedContainer) {
        setCachedContainer(container);
      }
    }, [container, cachedContainer]);

    return (
      <Fragment>
        <ProductNavigation isVisible={isVisible}>
          <ToggleContent
            isVisible={isVisible}
            hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}>
            <Product />
          </ToggleContent>
        </ProductNavigation>
        <Transition
          in={shouldRenderContainer}
          timeout={isMounted ? transitionDurationMs : 0}
          mountOnEnter={true}
          unmountOnExit={true}>
          {state => (
            <ContainerNavigation
              isEntering={state === "entering"}
              isExiting={state === "exiting"}
              isVisible={isVisible}>
              <ToggleContent
                isVisible={isVisible}
                hideNavVisuallyOnCollapse={hideNavVisuallyOnCollapse}>
                <Container />
              </ToggleContent>
            </ContainerNavigation>
          )}
        </Transition>
      </Fragment>
    );
  },
  (prev: Props, next: Props) => !deepEqual(prev, next)
);

interface ToggleProps {
  isVisible: boolean;
  hideNavVisuallyOnCollapse: boolean;
  children: ReactNode;
}
const ToggleContent = ({
  isVisible,
  hideNavVisuallyOnCollapse,
  children
}: ToggleProps) => {
  if (!hideNavVisuallyOnCollapse && !isVisible) return null;
  return <Fragment>{children}</Fragment>;
};
