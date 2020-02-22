import React, { ComponentType } from "react";
import { GLOBAL_NAV_WIDTH } from "../../common/constants";
import { Shadow } from "../../common/shadow";

interface Props {
  topOffset?: number;
  shouldHideGlobalNavShadow?: boolean;
  alternateFlyoutBehaviour: boolean;
  containerNavigation?: ComponentType<{}>;
  globalNavigation: ComponentType<{}>;
  closeFlyout: () => void;
}

export const ComposedGlobalNavigation = ({
  shouldHideGlobalNavShadow,
  alternateFlyoutBehaviour,
  containerNavigation,
  globalNavigation,
  closeFlyout
}: Props) => {
  const GlobalNavigation = globalNavigation;

  return (
    <div onMouseOver={alternateFlyoutBehaviour ? closeFlyout : undefined}>
      {!shouldHideGlobalNavShadow && (
        <Shadow
          direction="to left"
          isBold={!!containerNavigation}
          isOverDarkBackground={true}
          style={{ marginLeft: GLOBAL_NAV_WIDTH }}
        />
      )}
      <GlobalNavigation />
    </div>
  );
};
