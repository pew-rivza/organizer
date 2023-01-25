export type Menu = {
  icon: string;
  link: string;
}[];

export type Routing = {
  path: string;
  element: JSX.Element;
  title: string;
  index?: boolean;
};

export type Obj = {
  [key: string]: any;
};

export type Option = Obj & {
  value: number | string;
  label: string;
};

export type Page = {
  icon?: string;
  link: string;
  element?: JSX.Element;
  title?: string;
  index?: boolean;
  inMenu: boolean;
};

export type Navigation = (Page & {
  subpages?: Page[];
})[];
