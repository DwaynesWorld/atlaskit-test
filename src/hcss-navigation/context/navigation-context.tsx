import constate from "constate";
import { useUIController } from "../controller/ui-controller";
import { UIState } from "../models/ui-state";
import { CONTENT_NAV_WIDTH } from "../common/constants";

const DEFAULT_UI_STATE: UIState = {
  isCollapsed: false,
  productNavWidth: CONTENT_NAV_WIDTH,
  isResizeDisabled: false
};

const useNavigation = () => {
  const uiState = useUIController(DEFAULT_UI_STATE);

  return { uiState };
};

const [provider, context] = constate(useNavigation);

export const NavigationProvider = provider;
export const useNavigationContext = context;
