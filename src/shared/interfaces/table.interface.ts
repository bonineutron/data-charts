export interface ITableData {
  headCells: ITableCell[];
  bodyCells: ITableCell[][];
}

export interface ITableCell {
  content: string | number | JSX.Element | null;
  width?: string; // tailwind format
}
