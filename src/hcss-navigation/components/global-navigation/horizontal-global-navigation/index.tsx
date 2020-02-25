import React, { ComponentType, ReactNode } from "react";
import styled from "styled-components";
import { PrimaryItemsContainer } from "./primary-item-container";
import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from "hcss-navigation/common/constants";

interface HorizontalGlobalNavigationProps {
  appSwitcherComponent?: ComponentType<any>;
  productHomeComponent?: ComponentType<any>;
  primaryItems: ReactNode[];
  moreLabel?: string;
  createButtonComponent?: ComponentType<any>;
  searchComponent?: ComponentType<any>;
  notificationsComponent?: ComponentType<any>;
  helpComponent?: ComponentType<any>;
  settingsComponent?: ComponentType<any>;
  profileComponent?: ComponentType<any>;
}
export const HorizontalGlobalNavigation = ({
  appSwitcherComponent: AppSwitcher,
  productHomeComponent: ProductHome,
  primaryItems,
  moreLabel,
  createButtonComponent: Create,
  searchComponent: Search,
  notificationsComponent: Notifications,
  helpComponent: Help,
  settingsComponent: Settings,
  profileComponent: Profile
}: HorizontalGlobalNavigationProps) => {
  return (
    <Container>
      <PrimaryContainerWrapper>
        {AppSwitcher && <AppSwitcher />}
        {ProductHome && <ProductHome />}

        <PrimaryItemsContainer
          moreLabel={moreLabel}
          items={primaryItems}
          create={Create}
        />
      </PrimaryContainerWrapper>

      <SecondaryContainerWrapper>
        {Search && <Search />}
        {Notifications && <Notifications />}
        {Help && <Help />}
        {Settings && <Settings />}
        {Profile && <Profile />}
      </SecondaryContainerWrapper>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 12px;
  height: ${HORIZONTAL_GLOBAL_NAV_HEIGHT}px;
  position: relative;
  font-size: 14px;
  background-color: rgb(255, 255, 255);
  color: rgb(107, 119, 140);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }
`;

const PrimaryContainerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  min-width: 0px;
  height: inherit;

  & > * {
    flex-shrink: 0;
  }
`;

const SecondaryContainerWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0px;

  & > * {
    flex-shrink: 0px;
    margin-right: 4px;
  }
`;
