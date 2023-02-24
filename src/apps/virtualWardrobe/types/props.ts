export type AppProps = {
  page: "clothes" | "looks";
};

export type TabsProps = {
  selected: number | null;
  onSelect: React.Dispatch<React.SetStateAction<number | null>>;
};

export type ClothesListProps = {
  category: number | null;
};
