import React, { ReactNode } from "react";
import styled from "styled-components";

interface SideNavigationMenuItemProps {
  children: ReactNode;
}
export const SideNavigationMenuItem = ({
  children
}: SideNavigationMenuItemProps) => {
  return (
    <ItemWrapper>
      <Button>{children}</Button>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
`;

const Button = styled.button`
  align-items: center;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  justify-content: center;
  line-height: 1;
  position: relative;
  height: 32px;
  width: 32px;
  background-color: rgb(7, 71, 166);
  border-width: 0px;
  border-radius: 50%;
  outline: none;
  padding: 0px;
`;
