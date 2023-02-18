---
to: <%= path %><%= Name %>/<%= Name %>.tsx
---

import React from "react";

import "./<%= Name %>.scss";

export const <%= Name %>: React.FC = ({}) => {
  return (<div>Component <%= Name %> created!</div>);
};
