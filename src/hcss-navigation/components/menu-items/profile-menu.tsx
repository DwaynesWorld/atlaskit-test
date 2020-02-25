import React from "react";
import styled from "styled-components";
import { Dropdown } from "./dropdown";
import { DropdownMenu } from "./dropdown/dropdown-menu";
import { ConcreteColors } from "hcss-components";
import { DropdownButton } from "./dropdown/dropdown-button";
import { DropdownIcon } from "./dropdown/dropdown-icon";

export interface ProfileMenuProps {
  className?: string;
  /** MenuItem, Divider, or equivalent. */
  children: any;
  firstName: string;
  lastName?: string;
  /** Depending on product this could be business unit or company. */
  subtext: string;
}

export class ProfileMenu extends React.Component<ProfileMenuProps> {
  render() {
    const fullName =
      this.props.lastName !== undefined
        ? `${this.props.firstName} ${this.props.lastName[0]}.`
        : `${this.props.firstName}`;
    return (
      <Dropdown>
        <DropdownButton>
          <DropdownIcon className="fa fa-user-circle-o" />
        </DropdownButton>
        <ProfileDropdownMenu right>
          <ProfileMenuUserInfo className="profile-menu-userinfo">
            <div className="profile-menu-maintext">{fullName}</div>
            <div className="profile-menu-subtext">{this.props.subtext}</div>
          </ProfileMenuUserInfo>
          {this.props.children}
        </ProfileDropdownMenu>
      </Dropdown>
    );
  }
}

const ProfileMenuUserInfo = styled("div")`
  background: ${ConcreteColors.gray100};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 12px 12px;
  margin-bottom: 16px;
  line-height: normal;

  & > .profile-menu-maintext {
    width: 100px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  & > .profile-menu-subtext {
    font-size: 12px;
    color: ${ConcreteColors.gray600};
    overflow: hidden;
  }
`;

const ProfileDropdownMenu = styled(DropdownMenu)`
  padding: 20px 16px 12px 16px;

  & .dropdown-menu-item > a {
    padding: 10px 0;
  }
`;
