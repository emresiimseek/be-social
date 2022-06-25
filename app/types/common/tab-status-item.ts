interface Icon {
  name: string;
  type: string;
  size: number;
}

export interface TabStatusItem {
  title: string;
  isActive?: boolean;
  icon: Icon;
}
