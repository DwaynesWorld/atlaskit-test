import React, { Suspense } from "react";
import styled from "styled-components";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LoadingFallback } from "./components/loading-fallback";
import { HcssNavigation } from "hcss-navigation/components/";
import { About } from "./pages/about";
import { Dashboard } from "./pages/dashboard";
import { Projects } from "./pages/projects";
import { TopNavigationButton } from "hcss-navigation/components/global-navigation/top-navigation/top-navigation-button";
import { ProfileMenu } from "./hcss-navigation/components/menu-items/profile-menu";
import { HelpMenu } from "./hcss-navigation/components/menu-items/help-menu";
import { SettingsMenu } from "./hcss-navigation/components/menu-items/settings-menu";
import { ProductHome } from "hcss-navigation/components/menu-items/product-home";
import { ConcreteColors } from "hcss-components";
import {
  GlobalSideNavigation,
  GlobalTopNavigation
} from "hcss-navigation/components/global-navigation";

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
          alternateFlyoutBehaviour={false}
          globalTopNavigation={TopNavigation}
          globalSideNavigation={SideNavigation}
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

const TopNavigation = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <GlobalTopNavigation
      productHomeComponent={ProductHomeComponent}
      // moreLabel="More"
      primaryItems={[
        <TopNavigationButton
          key="dashboard"
          isHighlighted={location.pathname === "/"}
          onClick={() => history.push("/")}>
          Dashboard
        </TopNavigationButton>,
        <TopNavigationButton
          key="projects"
          isHighlighted={location.pathname === "/projects"}
          onClick={() => history.push("/projects")}>
          Projects
        </TopNavigationButton>,
        <TopNavigationButton
          key="about"
          isHighlighted={location.pathname === "/about"}
          onClick={() => history.push("/about")}>
          About
        </TopNavigationButton>
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

const SideNavigation = () => {
  return (
    <GlobalSideNavigation
      topOffset={0}
      style={{
        backgroundColor: ConcreteColors.gray300
      }}
      primaryItems={[]}
      secondaryItems={[]}
    />
  );
};

const ProductHomeComponent = () => {
  const history = useHistory();

  return (
    <ProductHome
      productName="HeavyBid"
      icon={
        <>
          <img
            height="20"
            width="20"
            src={require("./icon.png")}
            alt="nothing"
          />
        </>
      }
      onClick={() => history.push("/")}
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
