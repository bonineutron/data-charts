import { ITableData, ITableCell } from '../../../shared/interfaces/table.interface';
import { TableNavigation } from './abstractions/table.abstraction';
import { chunkArray } from '../../../shared/utils/table.util';
import SpinnerAtom from '../../atoms/spinner/spinner.atom';
import React, { useState, useEffect } from 'react';

type PropsTableAtom = {
  data: ITableData;
  messageNotFound?: boolean;
  colorRow?: boolean;
};

export default function TableAtom({ data, messageNotFound, colorRow }: PropsTableAtom): JSX.Element {
  // states
  const [chunkResult, setChunkResult] = useState<ITableCell[][]>([]);
  const [position, setPosition] = useState<number>(0);

  // effects
  useEffect(() => {
    const dataRows = chunkArray<ITableCell[], ITableCell>(data.bodyCells, 14) as ITableCell[][];
    setChunkResult(dataRows);
    setPosition(0);
  }, [data]);

  if (messageNotFound) {
    return (
      <div className='w-[200px] h-[40px] mx-auto mt-10 flex items-center justify-center text-secondary-color font-semibold border-secondary-color border-2 rounded-md'>
        <span>Sin resultados</span>
      </div>
    );
  }

  return chunkResult.length ? (
    <>
      <TableNavigation state={position} setState={setPosition} data={chunkResult} />
      <div className='w-full overflow-x-auto shadow-lg'>
        <table className='w-full shadow-lg'>
          <thead className='min-w-[740px] flex p-4 bg-gray-100'>
            <tr className='w-full flex justify-between gap-x-4 text-left'>
              {data.headCells.map((cell: ITableCell, index) => (
                <th key={`th-${index}`} className={`flex items-center ${cell.width || 'w-full'}`}>
                  {cell.content}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='min-w-[740px]'>
            {chunkResult.length
              ? chunkResult[position].map((cells: any, index: number) => (
                  <tr
                    key={`tr-${index}`}
                    className={`relative w-full flex justify-between gap-x-4 px-4 py-1 text-gray-500 ${
                      colorRow && index % 2 ? 'bg-gray-100' : ''
                    }`}>
                    {cells.map((cell: ITableCell, index: number) => (
                      <React.Fragment key={`td-${index}`}>
                        {cell.colorRow === 'red' && (
                          <div className='absolute h-full w-full top-0 left-0 bg-red-500 opacity-10 border-t-[1px] border-black'></div>
                        )}
                        {cell.colorRow === 'green' && (
                          <div className='absolute h-full w-full top-0 left-0 bg-green-500 opacity-10 border-t-[1px] border-black'></div>
                        )}
                        <td className={`flex items-center ${cell.width || 'w-full'}`}>{cell.content}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))
              : undefined}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <div className='mt-10 w-full flex justify-center'>
      <SpinnerAtom />
    </div>
  );
}
