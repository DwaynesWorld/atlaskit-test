import React from "react";
import styled from "styled-components";
import { Dropdown } from "./dropdown";
import { DropdownMenu } from "./dropdown/dropdown-menu";
import { DropdownMenuItem } from "./dropdown/dropdown-menu-item";
import { DropdownButton } from "./dropdown/dropdown-button";
import { DropdownIcon } from "./dropdown/dropdown-icon";
import { Divider } from "./dropdown/dropdown-menu-divider";

export interface HelpMenuProps {
  guest?: boolean;
  children?: any;
}

export const HelpMenu: React.StatelessComponent<HelpMenuProps> = props => {
  const children =
    props.guest !== undefined && props.guest
      ? HelpMenuGuestProps.children
      : props.children;

  return (
    <Dropdown>
      <DropdownButton>
        <DropdownIcon
          className="fa fa-question-circle-o"
          style={{ fontSize: "2rem" }}
        />
      </DropdownButton>
      <HelpDropdownMenu right>{children}</HelpDropdownMenu>
    </Dropdown>
  );
};

const HelpMenuGuestProps = {
  children: (
    <>
      <DropdownMenuItem
        key="dashboard"
        href="https://help.hcss.com"
        target="_blank"
        iconClassName="fa fa-file-text-o">
        Help Center
      </DropdownMenuItem>
      <DropdownMenuItem
        href="https://help.hcss.com/s/contactsupport"
        target="_blank"
        iconClassName="fa fa-envelope">
        Contact Support
      </DropdownMenuItem>
      <Divider />
      <DropdownMenuItem
        href="http://www.hcss.com/about-us/"
        target="_blank"
        iconClassName="fa fa-hcss">
        About HCSS
      </DropdownMenuItem>
    </>
  )
};

HelpMenu.defaultProps = {
  children: (
    <>
      <DropdownMenuItem
        key="1"
        href="https://help.hcss.com"
        target="_blank"
        iconClassName="fa fa-file-text-o">
        Help Center
      </DropdownMenuItem>
      <DropdownMenuItem
        key="2"
        href="https://support.hcss.com/chat/"
        target="_blank"
        iconClassName="fa fa-comments">
        Live Chat with Support
      </DropdownMenuItem>
      <DropdownMenuItem
        key="3"
        href="https://help.hcss.com/s/contactsupport"
        target="_blank"
        iconClassName="fa fa-envelope">
        Contact Support
      </DropdownMenuItem>
      <DropdownMenuItem
        key="4"
        href="tel:+18004443196"
        iconClassName="fa fa-phone">
        Help Line: 1-800-444-3196
      </DropdownMenuItem>
      <Divider />
      <DropdownMenuItem
        key="5"
        href="http://ideas.hcss.com/"
        target="_blank"
        iconClassName="fa fa-lightbulb-o">
        Log a Product Suggestion
      </DropdownMenuItem>
      <DropdownMenuItem
        key="6"
        href="http://www.hcss.com/about-us/"
        target="_blank"
        iconClassName="fa fa-hcss">
        About HCSS
      </DropdownMenuItem>
    </>
  )
};

const HelpDropdownMenu = styled(DropdownMenu)`
  padding: 16px 24px 12px 24px;

  & .dropdown-menu-item > a {
    padding: 10px 0;
  }
`;
