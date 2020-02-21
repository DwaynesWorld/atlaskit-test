---
to: src/components/site-layout.tsx
---
import React, { FC } from "react";
import styled from "styled-components";
import { LayoutConcrete } from "hcss-components";
import { strings } from "localization";

export const SiteLayout: FC = ({ children }) => (
  <LayoutConcrete
    navbar={<NavBar />}
    mainContent={<FullHeightContainer>{children}</FullHeightContainer>}
  />
);

const NavBar = () => (
  <LayoutConcrete.Navbar
    productBrandLight={strings.siteLayout.product.light}
    productBrandBold={strings.siteLayout.product.bold}
    navMenu={<NavMenu />}
    profileMenu={<ProfileMenu />}
  />
);

export const NavMenu = () => {
  return (
    <LayoutConcrete.NavMenu menuName="Menu">
      <LayoutConcrete.NavMenu.Group>
        <LayoutConcrete.DropdownMenuHeading>
          {strings.siteLayout.navMenu.info}
        </LayoutConcrete.DropdownMenuHeading>
        <LayoutConcrete.DropdownMenuItem to="/">
          {strings.siteLayout.navMenu.about}
        </LayoutConcrete.DropdownMenuItem>
      </LayoutConcrete.NavMenu.Group>
    </LayoutConcrete.NavMenu>
  );
};

export const ProfileMenu = () => {
  return (
    <LayoutConcrete.ProfileMenu
      firstName={"John"}
      lastName={"Doe"}
      subtext={"HCSS"}
    >
      <LayoutConcrete.DropdownMenuItem
        href="/Account/Logout"
        iconClassName="fa fa-power-off"
      >
        {strings.siteLayout.profileMenu.logout}
      </LayoutConcrete.DropdownMenuItem>
    </LayoutConcrete.ProfileMenu>
  );
};

const FullHeightContainer = styled.div`
  min-height: calc(100vh - 45px);
`;

