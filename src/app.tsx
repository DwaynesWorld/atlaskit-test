import React, { lazy, Suspense, Fragment } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { SiteLayout } from "./components/site-layout";
import { NotFound } from "./components/not-found";
import { LoadingFallback } from "./components/loading-fallback";
import {
  NavigationProvider,
  // LayoutManager,
  HeaderSection,
  MenuSection,
  Item,
  ThemeProvider,
  GlobalNav,
  modeGenerator
} from "@atlaskit/navigation-next";

import { LayoutManager } from "hcss-navigation/components/layout-manager";
import { NavigationControllerProvider } from "hcss-navigation/context/navigation-controller-context";

const About = lazy(() => import("./pages/about"));

// const customMode = modeGenerator({
//   product: {
//     text: colors.N0,
//     background: colors.G500
//   }
// });

const GlobalNavigation = () => {
  return (
    // <ThemeProvider
    //   theme={(theme: any) => ({
    //     ...theme,
    //     mode: customMode,
    //     context: "product"
    //   })}>
    <GlobalNav primaryItems={[]} secondaryItems={[]} />
    // </ThemeProvider>
  );
};

const MyProductNavigation = () => (
  <Fragment>
    <HeaderSection>
      {({ className }: any) => <div className={className}>Create </div>}
    </HeaderSection>
    <MenuSection>
      {({ className }: any) => (
        <div className={className}>
          <Item text="Dashboard" />
          <Item text="Projects" />
          <Item text="Estimates" />
          <Item text="Quote Management" />
          <Item text="Contacts" />
        </div>
      )}
    </MenuSection>
  </Fragment>
);

export const App = () => {
  return (
    // <SiteLayout>
    <Suspense fallback={<LoadingFallback />}>
      <NavigationControllerProvider>
        <FullHeightContainer>
          <LayoutManager
            topOffset={0}
            flyoutOnHover={true}
            fullWidthFlyout={false}
            hideNavVisuallyOnCollapse={false}
            shouldHideGlobalNavShadow={false}
            showContextualNavigation={true}
            horizontalGlobalNav={false}
            alternateFlyoutBehaviour={false}
            globalNavigation={() => null}
            productNavigation={() => null}
            containerNavigation={() => null}>
            <ContentWrapper>
              <Switch>
                <Route exact path="/" component={About} />
              </Switch>
            </ContentWrapper>
          </LayoutManager>
        </FullHeightContainer>
      </NavigationControllerProvider>
    </Suspense>
    // </SiteLayout>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const FullHeightContainer = styled.div`
  height: 100vh;
  margin-top: 0;
`;
