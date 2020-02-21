---
to: src/components/loading-fallback.tsx
---
import styled from "styled-components";
import React from "react";

export const LoadingFallback = () => (
  <LoadingFallbackContainer>Loading</LoadingFallbackContainer>
);

const LoadingFallbackContainer = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
