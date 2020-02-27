import React, { ComponentType, Fragment } from "react";
import { GLOBAL_SIDE_NAV_WIDTH } from "../../common/constants";
import { Shadow } from "../../common/shadow";

interface ComposedGlobalSideNavigationProps {
  topOffset?: number;
  shouldHideSideGlobalNavShadow?: boolean;
  alternateFlyoutBehaviour: boolean;
  contextNavigation?: ComponentType<{}>;
  globalSideNavigation: ComponentType<{}>;
  closeFlyout?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ComposedGlobalSideNavigation = ({
  shouldHideSideGlobalNavShadow,
  alternateFlyoutBehaviour,
  contextNavigation,
  globalSideNavigation,
  closeFlyout
}: ComposedGlobalSideNavigationProps) => {
  const GlobalNavigation = globalSideNavigation;

  return (
    <div
      className="ComposedGlobalSideNavigation"
      onMouseOver={alternateFlyoutBehaviour ? closeFlyout : undefined}>
      <Fragment>
        {!shouldHideSideGlobalNavShadow && (
          <Shadow
            direction="to left"
            isBold={!!contextNavigation}
            isOverDarkBackground={true}
            style={{ marginLeft: GLOBAL_SIDE_NAV_WIDTH }}
          />
        )}
        <GlobalNavigation />
      </Fragment>
    </div>
  );
};
