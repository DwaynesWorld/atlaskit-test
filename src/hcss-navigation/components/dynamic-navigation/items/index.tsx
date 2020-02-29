import React, { ReactNode, Fragment } from "react";
import styled from "styled-components";

interface ItemProps {
  text: ReactNode;
  subText?: string;
  before?: string | ReactNode;
  after?: string | ReactNode;
  onClick?: () => void;
}
export const Item = ({ text, subText, before, after, onClick }: ItemProps) => {
  const renderOther = (other?: string | ReactNode) => {
    if (other === undefined) return null;

    if (typeof other === "string") {
      return <i className={`section-item-icon fa fa-${other}`} />;
    }

    return <Fragment>{other}</Fragment>;
  };

  return (
    <InteractiveStateManager>
      <ItemBase onClick={onClick}>
        {before && <BeforeWrapper>{renderOther(before)}</BeforeWrapper>}

        <ContentWrapper>
          <TextWrapper>{text}</TextWrapper>
          {subText && <SubTextWrapper>{subText}</SubTextWrapper>}
        </ContentWrapper>

        {after && <AfterWrapper>{renderOther(after)}</AfterWrapper>}
      </ItemBase>
    </InteractiveStateManager>
  );
};

const InteractiveStateManager = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ItemBase = styled.button`
  align-items: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: inherit;
  color: inherit;
  display: flex;
  flex-shrink: 0;
  font-size: inherit;
  height: 40px;
  outline: none;
  text-align: left;
  text-decoration: none;
  width: 100%;
  padding-right: 12px;
  padding-left: 12px;

  &:focus {
    box-shadow: 0 0 0 2px #4c9aff inset;
  }

  &:hover {
    background-color: pink;
  }
`;

const BeforeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 8px;
`;

const AfterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  background-color: inherit;
  color: inherit;
`;

const TextWrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: calc(16 / 14);
  background-color: inherit;
  color: inherit;
`;

const SubTextWrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: calc(14 / 12);
  background-color: inherit;
  color: inherit;
`;
