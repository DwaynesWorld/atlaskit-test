import React from "react";
import classNames from "classnames";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { ConcreteColors } from "hcss-components";
import { useDropdownMenuManager } from "./dropdown-menu-manager";

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  /** Where does it go? */
  to?: any;
  /** The style of link you want to use. Currently only a Delete style can be chosen apart from the default one. Requires an onClick to be passed in order to apply the style. */
  hcssStyle?: "Delete";
  /** Force rendering of regular anchor tag, instead of react router link. Using the to prop is preferred over setting this prop.  */
  renderHtmlAnchor?: boolean;
  testId?: string;
}

export interface DropdownMenuItemProps extends LinkProps {
  /** (Optional) Specify an icon class to use an icon at the beginning of your menu item */
  iconClassName?: string;
}

function UpgradedDropdownMenuItem({
  className,
  iconClassName,
  children,
  to,
  ref,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const useReactRouterLink = to !== undefined;

  return (
    <MenuItemLink className={classNames("dropdown-menu-item", className)}>
      {useReactRouterLink ? (
        <Link
          to={to}
          {...props}
          className="dropdown-menu-link"
          onClick={onClick}>
          {iconClassName && <Icon className={iconClassName} />}
          {children}
        </Link>
      ) : (
        <a onClick={onClick} {...props} className="dropdown-menu-link">
          {iconClassName && <Icon className={iconClassName} />}
          {children}
        </a>
      )}
    </MenuItemLink>
  );
}

export const DropdownMenuItem = styled(
  useDropdownMenuManager(UpgradedDropdownMenuItem)
)`
  ${props =>
    props.disabled === true &&
    css`
      text-decoration: none;
      filter: alpha(opacity=65);
      -webkit-box-shadow: none;
      box-shadow: none;
      opacity: 0.65;
      pointer-events: none;
      cursor: not-allowed;
    `};
`;

const Icon = styled.i`
  width: 19.5px;
  margin-right: 10px;
`;

const MenuItemLink = styled.div`
  .dropdown-menu-link {
    display: inline-block;
    font-size: 1.35rem;
    line-height: normal;
    padding: 6px 0;
    max-width: 100%;
    color: ${ConcreteColors.gray700};
    cursor: pointer;
  }
  .dropdown-menu-link:hover {
    color: ${ConcreteColors.blue200};
  }

  .dropdown-menu-link:active {
    color: ${ConcreteColors.blue300};
  }
`;
