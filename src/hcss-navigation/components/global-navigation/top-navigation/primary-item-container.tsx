import React, { ReactNode, useCallback, ComponentType } from "react";
import styled from "styled-components";
import WidthDetector from "hcss-navigation/components/width-detector";
import { useOverflowController } from "../../../controllers/overflow-controller";
import { OverFlowStatusProvider } from "../../../contexts/overflow-status-context";
import { Dropdown } from "hcss-navigation/components/global-navigation/top-navigation/items/dropdown";
import { DropdownButton } from "hcss-navigation/components/global-navigation/top-navigation/items/dropdown/dropdown-button";
import { DropdownMenu } from "hcss-navigation/components/global-navigation/top-navigation/items/dropdown/dropdown-menu";
import { DropdownIcon } from "hcss-navigation/components/global-navigation/top-navigation/items/dropdown/dropdown-icon";

interface PrimaryItemsContainerProps {
  moreLabel?: string;
  items: ReactNode;
  create?: ComponentType<any>;
}
export const PrimaryItemsContainer = ({
  moreLabel,
  items,
  create: Create
}: PrimaryItemsContainerProps) => {
  const controller = useOverflowController(items);

  // const overflowContent = useCallback(
  //   () => (
  //     <OverFlowStatusProvider isVisible={false}>
  //       {overflowItems}
  //     </OverFlowStatusProvider>
  //   ),
  //   [overflowItems]
  // );

  return (
    <Wrapper>
      <OverFlowStatusProvider isVisible={true}>
        {controller.visibleItems}
      </OverFlowStatusProvider>

      {controller.overflowItems.length > 0 && (
        <Dropdown>
          <DropdownButton>
            {moreLabel === undefined ? (
              "•••"
            ) : (
              <>
                {moreLabel}&nbsp;
                <DropdownIcon className="fa fa-angle-down" />
              </>
            )}
          </DropdownButton>
          <OverflowDropdownMenu>
            <OverFlowStatusProvider isVisible={false}>
              {controller.overflowItems}
            </OverFlowStatusProvider>
          </OverflowDropdownMenu>
        </Dropdown>
      )}

      {Create && <Create />}

      <WidthDetector
        onResize={controller.updateWidth}
        containerStyle={{
          flexShrink: 1,
          minWidth: 1,
          margin: 0
        }}>
        {() => null}
      </WidthDetector>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  height: 100%;
  position: relative;

  & > * {
    flex-shrink: 0;
    margin: 0 4px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 24px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgb(255, 255, 255) 100%
    );
  }
`;

const OverflowDropdownMenu = styled(DropdownMenu)`
  padding: 16px 24px 12px 24px;

  & .dropdown-menu-item > a {
    padding: 10px 0;
  }
`;
