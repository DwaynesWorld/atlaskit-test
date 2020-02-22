export interface Resize {
  isCollapsed: boolean;
  productNavWidth: number;
}

export type CollapseToggleContent = (
  isCollapsed: boolean
) => { text: string; char: string };
