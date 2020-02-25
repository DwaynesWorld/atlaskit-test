import React, { Suspense } from "react";
import styled from "styled-components";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LoadingFallback } from "./components/loading-fallback";
import { HcssNavigation } from "hcss-navigation/components/";
import { About } from "./pages/about";
import { Dashboard } from "./pages/dashboard";
import { Projects } from "./pages/projects";
import { HorizontalGlobalNavigation } from "hcss-navigation/components/global-navigation";
import { HorizontalNavigationButton } from "hcss-navigation/components/global-navigation/horizontal-global-navigation/horizontal-navigation-button";
import { ProfileMenu } from "./hcss-navigation/components/menu-items/profile-menu";
import { HelpMenu } from "./hcss-navigation/components/menu-items/help-menu";
import { SettingsMenu } from "./hcss-navigation/components/menu-items/settings-menu";

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
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </ContentWrapper>
        </HcssNavigation>
      </FullHeightContainer>
    </Suspense>
  );
};

const GlobalNavigation = () => {
  const location = useLocation();
  const history = useHistory();

  console.log(location);
  return (
    <HorizontalGlobalNavigation
      primaryItems={[
        <HorizontalNavigationButton
          key="dashboard"
          isHighlighted={location.pathname === "/"}
          onClick={() => history.push("/")}>
          Dashboard
        </HorizontalNavigationButton>,
        <HorizontalNavigationButton
          key="projects"
          isHighlighted={location.pathname === "/projects"}
          onClick={() => history.push("/projects")}>
          Projects
        </HorizontalNavigationButton>,
        <HorizontalNavigationButton
          key="about"
          isHighlighted={location.pathname === "/about"}
          onClick={() => history.push("/about")}>
          About
        </HorizontalNavigationButton>
      ]}
      secondaryItems={[
        <HelpMenu key="help" />,
        <SettingsMenu key="settings" />,
        <ProfileMenu
          key="profile"
          firstName="kyle"
          lastName="thompson"
          subtext="nothing">
          something
        </ProfileMenu>
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
