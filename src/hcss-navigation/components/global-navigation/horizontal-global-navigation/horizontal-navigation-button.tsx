import React from "react";
import styled, { css } from "styled-components";
import { useOverflowStatusContext } from "hcss-navigation/contexts/overflow-status-context";
import { MenuItem } from "react-bootstrap";

interface HorizontalNavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isHighlighted?: boolean;
}
export const HorizontalNavigationButton = (
  props: HorizontalNavigationButtonProps
) => {
  const isVisible = useOverflowStatusContext();

  return isVisible ? (
    <PrimaryButton {...props} />
  ) : (
    <MenuItem onClick={props.onClick}>{props.children}</MenuItem>
  );
};

const PrimaryButton = ({
  isHighlighted = false,
  ...props
}: HorizontalNavigationButtonProps) => {
  return (
    <PrimaryButtonWrapper isHighlighted={isHighlighted}>
      <Button {...props} />
    </PrimaryButtonWrapper>
  );
};

const PrimaryButtonWrapper = styled.div<{ isHighlighted: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;

  ${p =>
    p.isHighlighted &&
    css`
      &::after {
        position: absolute;
        bottom: 0px;
        left: 4px;
        right: 4px;
        content: "";
        height: 3px;
        background-color: rgb(0, 82, 204);
        border-top-left-radius: 1px;
        border-top-right-radius: 1px;
      }
    `}
`;

const Button = styled.button`
  align-items: baseline;
  box-sizing: border-box;
  display: inline-flex;
  font-size: inherit;
  font-style: normal;
  font-weight: 500;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;
  box-shadow: transparent 0px 0px 0px 2px;
  color: rgb(52, 69, 99);
  height: 2.28571em;
  line-height: 2.28571em;
  vertical-align: middle;
  width: auto;
  border-width: 0px;
  text-decoration: none;
  background: transparent;
  border-radius: 3px;
  padding: 0px 4px;
  transition: background 0.1s ease-out 0s,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  outline: none !important;

  &:hover {
    color: rgb(0, 82, 204);
    background-color: rgba(222, 235, 255, 0.9);
    box-shadow: transparent 0px 0px 0px 2px;
  }
`;
