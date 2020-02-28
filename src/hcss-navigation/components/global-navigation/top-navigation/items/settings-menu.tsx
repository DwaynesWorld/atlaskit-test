import React, { ReactNode } from "react";
import styled from "styled-components";
import { Dropdown } from "./dropdown";
import { DropdownMenu } from "./dropdown/dropdown-menu";
import { DropdownButton } from "./dropdown/dropdown-button";
import { DropdownIcon } from "./dropdown/dropdown-icon";

export interface SettingsMenuProps {
  children?: ReactNode;
}

export const SettingsMenu: React.FunctionComponent<SettingsMenuProps> = ({
  children
}: SettingsMenuProps) => {
  return (
    <Dropdown>
      <DropdownButton>
        <DropdownIcon className="fa fa-cog" style={{ fontSize: "2rem" }} />
      </DropdownButton>
      <SettingsDropdownMenu right>{children}</SettingsDropdownMenu>
    </Dropdown>
  );
};

const SettingsDropdownMenu = styled(DropdownMenu)`
  padding: 16px 24px 12px 24px;

  & .dropdown-menu-item > a {
    padding: 10px 0;
  }
`;
