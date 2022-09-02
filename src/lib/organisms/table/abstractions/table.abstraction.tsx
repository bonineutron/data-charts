import { ITableCell } from '../../../../shared/interfaces/table.interface';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import React from 'react';

export const TableNavigation: React.FC<{
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  data: ITableCell[][];
}> = ({ state, setState, data }): JSX.Element => {
  return (
    <div className='w-fit mx-auto flex py-2'>
      <button
        onClick={() => setState(0)}
        className={`flex justify-center rounded-md ${
          state === 0 ? 'text-gray-300' : 'hover:bg-gray-100'
        }`}>
        <MdNavigateBefore className='text-[30px]' />
        <MdNavigateBefore className='ml-[-22px] text-[30px]' />
      </button>
      <button
        onClick={() => setState(!state ? 0 : state - 1)}
        className={`flex justify-center rounded-md ${
          state === 0 ? 'text-gray-300' : 'hover:bg-gray-100'
        }`}>
        <MdNavigateBefore className='text-[30px]' />
      </button>
      <button
        onClick={() => setState(state === data.length - 1 ? state : state + 1)}
        className={`flex justify-center rounded-md ${
          state === data.length - 1 ? 'text-gray-300' : 'hover:bg-gray-100'
        }`}>
        <MdNavigateNext className='text-[30px]' />
      </button>
      <button
        onClick={() => setState(data.length - 1)}
        className={`flex justify-center rounded-md ${
          state === data.length - 1 ? 'text-gray-300' : 'hover:bg-gray-100'
        }`}>
        <MdNavigateNext className='text-[30px]' />
        <MdNavigateNext className='ml-[-22px] text-[30px]' />
      </button>
    </div>
  );
};
