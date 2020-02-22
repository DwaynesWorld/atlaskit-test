import constate from "constate";
import { useRef } from "react";

const useScroll = () => {
  const ref = useRef(null);
  return ref;
};

const [provider, context] = constate(useScroll);

export const ProductScrollProvider = provider;
export const useProductScrollContext = context;
