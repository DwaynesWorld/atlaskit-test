export interface Resize {
  isCollapsed: boolean;
  moduleNavWidth: number;
}

export type CollapseToggleContent = (
  isCollapsed: boolean
) => { text: string; char: string };
