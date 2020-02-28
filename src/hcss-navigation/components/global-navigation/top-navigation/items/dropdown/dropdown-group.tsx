import React from "react";
import classNames from "classnames";
import styled from "styled-components";

export class DropdownGroup extends React.Component<
  React.HTMLProps<HTMLUListElement>
> {
  render() {
    const { children, className, ...props } = this.props;
    return (
      <StyledDropdownGroup
        className={classNames(className, "dropdown-group")}
        {...(props as any)}>
        {children}
      </StyledDropdownGroup>
    );
  }
}

const StyledDropdownGroup = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  height: 100%;
`;
