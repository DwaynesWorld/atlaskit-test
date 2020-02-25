import React from "react";
import { NavigationControllerProvider } from "hcss-navigation/context/navigation-controller-context";
import {
  LayoutManager,
  LayoutManagerProps
} from "hcss-navigation/components/layout-manager";

type HcssNavigationProps = LayoutManagerProps;

export const HcssNavigation = (props: HcssNavigationProps) => {
  return (
    <NavigationControllerProvider>
      <LayoutManager {...props} />
    </NavigationControllerProvider>
  );
};
