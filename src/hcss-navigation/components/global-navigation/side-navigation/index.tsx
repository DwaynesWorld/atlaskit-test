import React, { ReactNode, ComponentType } from "react";
import styled from "styled-components";
import { GLOBAL_SIDE_NAV_WIDTH } from "hcss-navigation/common/constants";

interface GlobalSideNavigationProps {
  topOffset?: number;
  style?: React.CSSProperties;
  primaryItems: ReactNode[];
  secondaryItems: ReactNode[];
  createButtonComponent?: ComponentType<any>;
}
export const GlobalSideNavigation = ({
  topOffset = 0,
  style,
  primaryItems,
  secondaryItems,
  createButtonComponent: Create
}: GlobalSideNavigationProps) => {
  return (
    <Container topOffset={topOffset} style={style}>
      <PrimaryContainerWrapper>
        {Create && (
          <CreateContainerWrapper>
            <Create />
          </CreateContainerWrapper>
        )}

        {primaryItems}
      </PrimaryContainerWrapper>

      <SecondaryContainerWrapper>{secondaryItems}</SecondaryContainerWrapper>
    </Container>
  );
};

const Container = styled.div<{ topOffset: number }>`
  --top-offset: ${p => p.topOffset}px;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-top: 24px;
  transition: background-color 0.3s cubic-bezier(0.2, 0, 0, 1),
    color 0.3s cubic-bezier(0.2, 0, 0, 1);
  height: calc(100vh - var(--top-offset));
  width: ${GLOBAL_SIDE_NAV_WIDTH}px;
`;

const CreateContainerWrapper = styled.div`
  padding-bottom: 10px;
`;

const PrimaryContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 16px;
`;

const SecondaryContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-top: 8px;
`;
