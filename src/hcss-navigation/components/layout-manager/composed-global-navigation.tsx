import React, { ComponentType } from "react";
import { GLOBAL_NAV_WIDTH } from "../../common/constants";
import { Shadow } from "../../common/shadow";

interface ComposedGlobalNavigationProps {
  topOffset?: number;
  shouldHideGlobalNavShadow?: boolean;
  alternateFlyoutBehaviour: boolean;
  contextNavigation?: ComponentType<{}>;
  globalNavigation: ComponentType<{}>;
  closeFlyout?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ComposedGlobalNavigation = ({
  shouldHideGlobalNavShadow,
  alternateFlyoutBehaviour,
  contextNavigation,
  globalNavigation,
  closeFlyout
}: ComposedGlobalNavigationProps) => {
  const GlobalNavigation = globalNavigation;

  return (
    <div onMouseOver={alternateFlyoutBehaviour ? closeFlyout : undefined}>
      {!shouldHideGlobalNavShadow && (
        <Shadow
          direction="to left"
          isBold={!!contextNavigation}
          isOverDarkBackground={true}
          style={{ marginLeft: GLOBAL_NAV_WIDTH }}
        />
      )}
      <GlobalNavigation />
    </div>
  );
};
