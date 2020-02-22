export type ExpandListener = (node: HTMLElement, isAppearing: boolean) => void;
export type CollapseListener = (node: HTMLElement) => void;

export interface CollapseListeners {
  /** Called when the navigation begins expanding. */
  onExpandStart?: ExpandListener;
  /** Called when the navigation completes expanding. */
  onExpandEnd?: ExpandListener;
  /** Called when the navigation begins collapsing. */
  onCollapseStart?: CollapseListener;
  /** Called when the navigation completes collapsing. */
  onCollapseEnd?: CollapseListener;
}
