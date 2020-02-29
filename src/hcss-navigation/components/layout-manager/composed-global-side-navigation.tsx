import React, { ComponentType, Fragment } from "react";
import { GLOBAL_SIDE_NAV_WIDTH } from "../../common/constants";
import { Shadow } from "../../common/shadow";

interface ComposedGlobalSideNavigationProps {
  topOffset?: number;
  showGlobalSideNavShadow?: boolean;
  alternateFlyoutBehaviour: boolean;
  contextNavigation?: ComponentType<{}>;
  globalSideNavigation: ComponentType<{}>;
  closeFlyout?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ComposedGlobalSideNavigation = ({
  showGlobalSideNavShadow = true,
  alternateFlyoutBehaviour,
  contextNavigation,
  globalSideNavigation,
  closeFlyout
}: ComposedGlobalSideNavigationProps) => {
  const GlobalNavigation = globalSideNavigation;

  return (
    <div
      className="composed-global-side-navigation"
      onMouseOver={alternateFlyoutBehaviour ? closeFlyout : undefined}>
      <Fragment>
        {showGlobalSideNavShadow && (
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
