import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import {
  transitionDuration,
  transitionTimingFunction
} from "../../common/constants";

interface ContextNavigationWrapperProps {
  isEntering: boolean;
  isExiting: boolean;
  isVisible: boolean;
  children: ReactNode;
}

export const ContextNavigationWrapper = ({
  isEntering,
  isExiting,
  isVisible,
  children
}: ContextNavigationWrapperProps) => {
  return (
    <Outer isEntering={isEntering} isExiting={isExiting}>
      <Inner isVisible={isVisible}>{children}</Inner>
    </Outer>
  );
};

interface OuterProps {
  isEntering: boolean;
  isExiting: boolean;
}

const Outer = styled.div<OuterProps>`
  animation-duration: ${transitionDuration};
  animation-fill-mode: forwards;
  animation-timing-function: ${transitionTimingFunction};
  transition-property: box-shadow, transform;
  transition-duration: ${transitionDuration};
  transition-timing-function: ${transitionTimingFunction};
  transform: ${p => (p.isExiting ? "translateX(100%)" : undefined)};
  animation-name: ${p => (p.isEntering ? slideIn : undefined)};
`;

interface InnerProps {
  isVisible: boolean;
}

const Inner = styled.div<InnerProps>`
  box-sizing: border-box;
  display: ${p => (p.isVisible ? "flex" : "none")};
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;
