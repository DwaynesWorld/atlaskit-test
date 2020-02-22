import constate from "constate";
import { noop } from "../common/noop";

interface Emitters {
  emitItemDragStart: () => void;
  emitItemDragEnd: () => void;
}

interface LayoutEventListenerProps {
  onItemDragStart?: () => void;
  onItemDragEnd?: () => void;
}

const useLayoutEventListener = ({
  onItemDragStart,
  onItemDragEnd
}: LayoutEventListenerProps) => {
  const emitters: Emitters = {
    emitItemDragStart: onItemDragStart || noop,
    emitItemDragEnd: onItemDragEnd || noop
  };

  return { emitters };
};

const [provider, context] = constate(useLayoutEventListener);

export const LayoutEventProvider = provider;
export const userLayoutEventContext = context;
