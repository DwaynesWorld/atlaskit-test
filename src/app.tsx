import React, { Suspense } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { LoadingFallback } from "./components/loading-fallback";
import { HcssNavigation } from "hcss-navigation/components/";
import { Estimates } from "./pages/estimates";
import { Dashboard } from "./pages/dashboard";
import { Projects } from "./pages/projects";
import { Contacts } from "./pages/contacts";
import { Quotes } from "./pages/quotes";
import { Messages } from "./pages/messages";
import { TopNavigation } from "app-top-navigation";
import { SideNavigation } from "app-side-navigation";

export const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FullHeightContainer>
        <HcssNavigation
          topOffset={0}
          flyoutOnHover={true}
          fullWidthFlyout={true}
          hideNavVisuallyOnCollapse={false}
          shouldHideGlobalNavShadow={true}
          showContextualNavigation={true}
          alternateFlyoutBehaviour={false}
          globalTopNavigation={TopNavigation}
          globalSideNavigation={SideNavigation}
          moduleNavigation={() => null}
          contextNavigation={() => null}>
          <ContentWrapper>
            <Switch>
              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/quotes" component={Quotes} />
              <Route exact path="/messages" component={Messages} />
              <Route exact path="/estimates" component={Estimates} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </ContentWrapper>
        </HcssNavigation>
      </FullHeightContainer>
    </Suspense>
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
