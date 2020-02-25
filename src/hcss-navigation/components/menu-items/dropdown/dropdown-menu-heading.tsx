import React from "react";
import styled from "styled-components";
import { ConcreteColors } from "hcss-components";

export interface DropdownMenuHeadingProps {
  /** (Optional) Specify an icon class to use an icon at the beginning of your heading */
  iconClassName?: string;
  children: string;
}

export const DropdownMenuHeading = ({
  iconClassName,
  children
}: DropdownMenuHeadingProps) => {
  return (
    <MenuHeading className="dropdown-menu-heading">
      {iconClassName && <Icon className={iconClassName} />}
      {children}
    </MenuHeading>
  );
};

const Icon = styled.i`
  width: 19.5px;
  margin-right: 10px;
`;

const MenuHeading = styled.div`
  display: block;
  font-size: 1.22rem;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 12px 0;
  color: ${ConcreteColors.gray600};
`;
