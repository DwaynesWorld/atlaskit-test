import React, { Suspense } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { LoadingFallback } from "./components/loading-fallback";
import { HcssNavigation } from "hcss-navigation/components/";
import About from "./pages/about";
import { HorizontalGlobalNavigation } from "hcss-navigation/components/global-navigation";
import { HorizontalNavigationButton } from "hcss-navigation/components/global-navigation/horizontal-global-navigation/horizontal-navigation-button";

export const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FullHeightContainer>
        <HcssNavigation
          topOffset={0}
          flyoutOnHover={true}
          fullWidthFlyout={true}
          hideNavVisuallyOnCollapse={false}
          shouldHideGlobalNavShadow={false}
          showContextualNavigation={true}
          horizontalGlobalNav={true}
          alternateFlyoutBehaviour={false}
          globalNavigation={GlobalNavigation}
          moduleNavigation={() => null}
          contextNavigation={() => null}>
          <ContentWrapper>
            <Switch>
              <Route exact path="/" component={About} />
            </Switch>
          </ContentWrapper>
        </HcssNavigation>
      </FullHeightContainer>
    </Suspense>
  );
};

const GlobalNavigation = () => {
  return (
    <HorizontalGlobalNavigation
      primaryItems={[
        <HorizontalNavigationButton
          onClick={(...args: any[]) => {
            console.log("Dashboard click", ...args);
          }}>
          Dashboard
        </HorizontalNavigationButton>,
        <HorizontalNavigationButton
          onClick={(...args: any[]) => {
            console.log("Projects click", ...args);
          }}>
          Projects
        </HorizontalNavigationButton>,
        <HorizontalNavigationButton
          isHighlighted
          onClick={(...args: any[]) => {
            console.log("Estimates click", ...args);
          }}>
          Estimates
        </HorizontalNavigationButton>
      ]}
    />
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
