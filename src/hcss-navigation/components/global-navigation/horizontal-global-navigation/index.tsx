import React, { ComponentType, ReactNode } from "react";
import styled from "styled-components";
import { PrimaryItemsContainer } from "./primary-item-container";
import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from "hcss-navigation/common/constants";

interface HorizontalGlobalNavigationProps {
  appSwitcherComponent?: ComponentType<any>;
  productHomeComponent?: ComponentType<any>;
  primaryItems: ReactNode[];
  secondaryItems: ReactNode[];
  moreLabel?: string;
  createButtonComponent?: ComponentType<any>;
}
export const HorizontalGlobalNavigation = ({
  appSwitcherComponent: AppSwitcher,
  productHomeComponent: ProductHome,
  primaryItems,
  secondaryItems,
  moreLabel,
  createButtonComponent: Create
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

      <SecondaryContainerWrapper>{secondaryItems}</SecondaryContainerWrapper>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding-left: 0px;
  padding-right: 0px;
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
  /* align-items: center;
  display: flex;
  flex-shrink: 0px; */

  display: flex;
  /* flex-grow: 1; */
  flex-shrink: 0;
  align-items: center;
  height: inherit;

  & > * {
    flex-shrink: 0;
    margin-right: 0px;
  }
`;
