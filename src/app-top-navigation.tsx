import React, { memo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { TopNavigationButton } from "hcss-navigation/components/global-navigation/top-navigation/items";
import { ProfileMenu } from "./hcss-navigation/components/global-navigation/top-navigation/items/profile-menu";
import { HelpMenu } from "./hcss-navigation/components/global-navigation/top-navigation/items/help-menu";
import { SettingsMenu } from "./hcss-navigation/components/global-navigation/top-navigation/items/settings-menu";
import { ProductHome } from "hcss-navigation/components/global-navigation/top-navigation/items/product-home";
import { GlobalTopNavigation } from "hcss-navigation/components/global-navigation";

export const TopNavigation = memo(() => {
  const location = useLocation();
  const history = useHistory();

  return (
    <GlobalTopNavigation
      productHomeComponent={ProductHomeComponent}
      // moreLabel="More"
      primaryItems={
        [
          // <TopNavigationButton
          //   key="dashboard"
          //   isHighlighted={location.pathname === "/"}
          //   onClick={() => history.push("/")}>
          //   Dashboard
          // </TopNavigationButton>,
          // <TopNavigationButton
          //   key="projects"
          //   isHighlighted={location.pathname === "/projects"}
          //   onClick={() => history.push("/projects")}>
          //   Projects
          // </TopNavigationButton>,
          // <TopNavigationButton
          //   key="about"
          //   isHighlighted={location.pathname === "/about"}
          //   onClick={() => history.push("/about")}>
          //   About
          // </TopNavigationButton>
        ]
      }
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
});

const ProductHomeComponent = memo(() => {
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
});
