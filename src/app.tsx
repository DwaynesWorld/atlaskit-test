import React, { Suspense, Fragment } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { LoadingFallback } from "./components/loading-fallback";
import { HcssNavigation } from "hcss-navigation/components/";
import About from "./pages/about";

import {
  HeaderSection,
  MenuSection,
  Item,
  GlobalNav
} from "@atlaskit/navigation-next";

export const App = () => {
  return (
    // <SiteLayout>
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
    // </SiteLayout>
  );
};

const GlobalNavigation = () => {
  return <GlobalNav primaryItems={[]} secondaryItems={[]} />;
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

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const FullHeightContainer = styled.div`
  height: 100vh;
  margin-top: 0;
`;
