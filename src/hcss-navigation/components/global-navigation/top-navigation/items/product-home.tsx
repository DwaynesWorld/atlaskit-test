import React, { Fragment, ReactNode } from "react";
import styled from "styled-components";

interface ProductHomeProps {
  icon: ReactNode;
  productName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const ProductHome = ({
  icon,
  productName,
  onClick
}: ProductHomeProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return (
    <Fragment>
      <Button onClick={handleClick}>{icon}</Button>
      {productName && <NameContainer className="">{productName}</NameContainer>}
    </Fragment>
  );
};

const Button = styled.button`
  margin: 0 5px;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
  color: inherit;
  padding: 4px;
  border-radius: 3px;
  border-width: 0px;
  background: none;

  &:focus {
    outline: none;
  }
`;

const NameContainer = styled.div`
  margin-left: 4px;
  display: flex;
  align-items: center;
  padding-right: 16px;
  margin-right: 6px;
  border-right: 0px solid rgba(107, 119, 140, 0.3);
`;
