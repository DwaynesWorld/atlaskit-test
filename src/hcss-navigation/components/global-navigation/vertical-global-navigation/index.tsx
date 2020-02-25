import React from "react";
import styled from "styled-components";

export const VerticalGlobalNavigation = () => {
  return (
    <Container>
      <PrimaryContainerWrapper>something</PrimaryContainerWrapper>
      <SecondaryContainerWrapper>
        something else <div>cc</div>
      </SecondaryContainerWrapper>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
  height: 45px;

  &::after {
    content: '""';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }
`;

const PrimaryContainerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  min-width: 0px;
  height: inherit;

  & > * {
    flex-shrink: 0px;
  }
`;

const SecondaryContainerWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0px;

  & > * {
    flex-shrink: 0px;
    margin-right: 4px;
  }
`;
