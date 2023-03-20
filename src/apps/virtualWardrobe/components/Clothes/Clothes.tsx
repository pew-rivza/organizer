import React, { useState } from "react";

import { List } from "./components/List";
import { Tabs } from "./components/Tabs";

export const Clothes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <React.Fragment>
      <Tabs selected={selectedCategory} onSelect={setSelectedCategory} />
      <List category={selectedCategory} />
    </React.Fragment>
  );
};
