import React from "react";
import styled, { css } from "styled-components";
import { useOverflowStatusContext } from "hcss-navigation/contexts/overflow-status-context";
import { DropdownMenuItem } from "hcss-navigation/components/global-navigation/top-navigation/items/dropdown/dropdown-menu-item";

interface TopNavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isHighlighted?: boolean;
}
export const TopNavigationButton = (props: TopNavigationButtonProps) => {
  const isVisible = useOverflowStatusContext();

  return isVisible ? (
    <PrimaryButton {...props} />
  ) : (
    <DropdownMenuItem onClick={props.onClick}>
      {props.children}
    </DropdownMenuItem>
  );
};

const PrimaryButton = ({
  isHighlighted = false,
  ...props
}: TopNavigationButtonProps) => {
  return (
    <PrimaryButtonWrapper isHighlighted={isHighlighted}>
      <Button isHighlighted={isHighlighted} {...props} />
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
`;

const Button = styled.button<{ isHighlighted: boolean }>`
  align-items: baseline;
  box-sizing: border-box;
  display: inline-flex;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;
  box-shadow: transparent 0px 0px 0px 2px;
  color: #1e1e1e;
  line-height: 2.28571em;
  vertical-align: middle;
  height: 100%;
  width: auto;
  border-width: 0px;
  text-decoration: none;
  background: transparent;
  border-radius: 3px;
  padding: 0px 4px;
  transition: background 0.1s ease-out 0s,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  outline: none !important;

  ${p =>
    p.isHighlighted &&
    css`
      color: #0370f5;
    `}

  &:hover {
    color: #0370f5;
    background: #ecf5fe;
    box-shadow: transparent 0px 0px 0px 2px;
  }
`;
