export interface DragData {
  plugins: {
    dragData: {
      round: 0;
      onDragEnd: (
        e: MouseEvent,
        datasetIndex: number,
        index: number,
        value: number,
      ) => void;
    };
  };
}
