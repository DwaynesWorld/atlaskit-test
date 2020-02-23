import React, { MutableRefObject } from "react";
import styled from "styled-components";

interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonRef: MutableRefObject<HTMLButtonElement | undefined>;
  hasHighlight: boolean;
  isVisible: boolean;
  islargeHitArea: boolean;
}
export const ToggleButton = ({
  buttonRef,
  hasHighlight,
  isVisible,
  islargeHitArea,
  children,
  ...props
}: ToggleButtonProps) => {
  return (
    <Button
      className="navigation-resize-button"
      type="button"
      ref={r => (buttonRef.current = r || undefined)}
      hasHighlight={hasHighlight}
      isVisible={isVisible}
      {...props}>
      <HitArea className={islargeHitArea ? "large" : "small"} />
      {children}
    </Button>
  );
};

interface ButtonProps {
  hasHighlight: boolean;
  isVisible: boolean;
}
const Button = styled.button<ButtonProps>`
  position: absolute;
  top: 32px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  padding: 0;
  outline: 0;
  border: 0;
  border-radius: 50%;
  background: 0;
  background-color: white;
  box-shadow: 0 0 0 1px rgba(9, 30, 66, 0.08),
    0 2px 4px 1px rgba(9, 30, 66, 0.08);
  color: ${p => (p.hasHighlight ? "#4C9AFF" : "#6B778C")};
  opacity: ${p => (p.isVisible ? 1 : 0)};

  transition: background-color 100ms linear, color 100ms linear,
    opacity 300ms cubic-bezier(0.2, 0, 0, 1),
    transform 300ms cubic-bezier(0.2, 0, 0, 1);
  transform: translate(-50%);

  &:hover {
    background-color: #4c9aff;
    color: white;
  }

  &:active {
    background-color: #2684ff;
    color: white;
  }

  &:focus {
    opacity: 1;
    background-color: #2684ff;
    color: white;
  }
`;

const HitArea = styled.div`
  position: absolute;

  &.small {
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  }

  &.large {
    top: -8px;
    right: -12px;
    bottom: -8px;
    left: -8px;
  }
`;
