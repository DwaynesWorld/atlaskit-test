import React, { useState, useMemo } from "react";
import constate from "constate";

interface OverFlowStatusProps {
  isVisible: boolean;
}
const useOverflowStatus = ({ isVisible: v }: OverFlowStatusProps) => {
  const [isVisible] = useState(v);
  return isVisible;
};

const [Provider, Context] = constate(useOverflowStatus);

interface OverflowProviderProps {
  isVisible: boolean;
  children: any;
}
export const OverFlowStatusProvider = ({
  children,
  isVisible
}: OverflowProviderProps) => {
  const value = useMemo(() => isVisible, [isVisible]);
  return <Provider isVisible={value}>{children}</Provider>;
};

export const useOverflowStatusContext = Context;
