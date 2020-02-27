import React, { ReactNode } from "react";
import styled from "styled-components";

interface SideNavigationMenuItemProps {
  children: ReactNode;
}
export const SideNavigationMenuItem = ({
  children
}: SideNavigationMenuItemProps) => {
  return <ItemWrapper>{children}</ItemWrapper>;
};

const ItemWrapper = styled.div`
  padding: 4px;
`;
