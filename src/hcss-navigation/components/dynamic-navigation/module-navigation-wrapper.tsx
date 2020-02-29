import React, { ReactNode } from "react";
import styled from "styled-components";
import { DYNAMIC_NAV_WIDTH } from "hcss-navigation/common/constants";
import { ConcreteColors } from "hcss-components";

interface ModuleNavigationWrapperProps {
  isVisible: boolean;
  children: ReactNode;
}

export const ModuleNavigationWrapper = ({
  isVisible,
  children
}: ModuleNavigationWrapperProps) => (
  <Outer className="module-navigation-wrapper-outer">
    <Inner
      className="module-navigation-wrapper-inner"
      isVisible={isVisible}
      tabIndex={-1}
      role="group">
      {children}
    </Inner>
  </Outer>
);

const Outer = styled.div`
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  min-width: ${DYNAMIC_NAV_WIDTH}px;
  overflow-x: hidden;
  background-color: white;
  /*${ConcreteColors.gray200}; color: #ffffff; */

  &:not(:only-child) {
    z-index: -1;
  }
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
