import { ITableData, ITableCell } from '../../../shared/interfaces/table.interface';

type PropsTableAtom = {
  data: ITableData;
};

export default function TableAtom({ data }: PropsTableAtom): JSX.Element {
  return (
    <table className='w-full shadow-lg rounded-lg overflow-x-auto'>
      <thead className='min-w-[740px] flex p-4 bg-gray-100 rounded-t-lg'>
        <tr className='w-full flex justify-between text-left'>
          {data.headCells.map((cell: ITableCell, index) => (
            <th key={`th-${index}`} className={`${cell.width || 'w-full'}`}>
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='min-w-[740px]'>
        {data.bodyCells.map((cells: ITableCell[], index: number) => (
          <tr
            key={`tr-${index}`}
            className={`flex px-4 py-1 text-gray-600 ${index % 2 && 'bg-gray-100'}`}>
            {cells.map((cell: ITableCell, index) => (
              <td key={`td-${index}`} className={`${cell.width || 'w-full'}`}>
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
