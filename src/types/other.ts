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
