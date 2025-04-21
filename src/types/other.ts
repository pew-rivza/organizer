import React from "react";

export type Routing = {
  path: string;
  element: React.ReactNode;
  title: string;
  index?: boolean;
};

export type Obj = {
  [key: string]: any;
};

export type SelectOption = Obj & {
  value: number | string;
  label: string;
};

export type Auth = {
  authenticated: boolean;
};
