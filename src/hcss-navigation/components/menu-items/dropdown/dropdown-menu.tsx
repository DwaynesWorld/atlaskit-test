import React from "react";
import styled, { css } from "styled-components";
import { ConcreteColors } from "hcss-components";

export interface DropdownMenuProps extends React.HTMLProps<HTMLUListElement> {
  className?: string;
  /** @ignore */
  isOpen?: boolean;
  right?: boolean;
  fullWidth?: boolean;
  widthEm?: number;
  columnCount?: number;
  columnWidthEm?: number;
  width?: string;
}

export const DropdownMenu = styled.div<DropdownMenuProps>`
  z-index: 1031;
  position: absolute;
  top: 42px;
  margin: 0;
  padding: 0 16px 48px 16px;
  background-color: white;
  border: none;
  border-radius: 0;
  box-shadow: -2px 6px 8px -6px ${ConcreteColors.gray500};
  z-index: 2;

  display: ${props => (props.isOpen ? "block" : "none")};
  ${props =>
    (props.right &&
      css`
        right: 0;
        left: auto;
      `) as any};
  ${props =>
    (props.widthEm &&
      css`
        width: 70vw;
        max-width: ${props.widthEm}em;
      `) as any};
  ${props =>
    (props.columnCount &&
      css`
        columns: ${props.columnWidthEm}em ${props.columnCount};
      `) as any};
  ${props =>
    (props.columnWidthEm &&
      css`
        column-width: ${props.columnWidthEm}em;
      `) as any};
  ${props =>
    props.fullWidth &&
    css`
      width: 100vw;
      left: 0px;
      margin-left: 0px;
      max-width: ${props.width};
      columns: ${props.columnCount} ${props.columnWidthEm}rem;
    `};
`;
