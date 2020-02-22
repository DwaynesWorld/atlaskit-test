import constate from "constate";
import { useUIController } from "../controller/ui-controller";
import { UIState } from "../models/ui-state";
import { CONTENT_NAV_WIDTH } from "../common/constants";

const DEFAULT_UI_STATE: UIState = {
  isCollapsed: false,
  productNavWidth: CONTENT_NAV_WIDTH,
  isResizeDisabled: false
};
// TODO: Allow uses to specify default nav state
const useNavigationController = () => {
  const controller = useUIController(DEFAULT_UI_STATE);

  return controller;
};

const [provider, context] = constate(useNavigationController);

export const NavigationControllerProvider = provider;
export const useNavigationControllerContext = context;
