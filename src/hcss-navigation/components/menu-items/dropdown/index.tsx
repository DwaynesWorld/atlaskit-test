import React from "react";
import styled from "styled-components";
import { UnstyledDropdown, DropdownProps } from "./dropdown-unstyled";

export class Dropdown extends React.Component<DropdownProps> {
  render() {
    const { children, className, ...props } = this.props;
    return <StyledDropdown {...props}>{children}</StyledDropdown>;
  }
}

const StyledDropdown = styled(UnstyledDropdown)`
  display: inline-block;
  height: 100%;
  z-index: 2000;
`;
