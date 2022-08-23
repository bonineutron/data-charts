import { IUserData } from '../../../shared/interfaces/users.interface';
import { userDataMock } from '../../../shared/mocks/data-users.mock';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableAtom from '../../atoms/table/table.atom';
import { useState, useEffect } from 'react';

export default function UsersTableTemplate() {
  const [data, setData] = useState<IUserData[]>([]);
  const [reverse, setReverse] = useState<boolean>(false);
  useEffect(() => {
    setData(userDataMock);
  }, []);
  useEffect(() => {
    data.reverse();
  }, [reverse, data]);

  return (
    <LayoutOrganism
      title='Data Charts - Users'
      name='description'
      content='Users page this app, table view. Filter user data.'>
      <div className='w-full flex flex-col justify-between mb-6 rounded-lg gap-6 sm:flex-row'>
        <div className='w-full flex justify-between sm:w-[30%]'>
          <select
            name='alphabetical-order'
            id='alphabetical-order'
            className='bg-white shadow-lg px-4 py-2 rounded-lg font-semibold'>
            <option label='A-Z' value='' hidden />
          </select>
          <select
            name='country'
            id='country'
            className='bg-white shadow-lg px-4 py-2 rounded-lg font-semibold'>
            <option label='Country' value='' hidden />
          </select>
        </div>
        <div className='w-full flex justify-between shadow-lg rounded-lg sm:w-[40%]'>
          <input placeholder='...' type='text' className='rounded-l-lg py-2 px-4 outline-none' />
          <button
            onClick={() => setReverse((isOpen) => !isOpen)}
            className='px-4 bg-black text-white font-semibold rounded-r-lg'>
            Search
          </button>
        </div>
      </div>
      <TableAtom
        data={{
          headCells: [
            { content: 'Code', width: 'w-[20%]' },
            { content: 'Name', width: 'w-[30%]' },
            { content: 'Mail', width: 'w-[50%]' }
          ],
          bodyCells: data.map((user: IUserData) => [
            { content: user.code, width: 'w-[20%]' },
            { content: user.name, width: 'w-[30%]' },
            { content: user.email, width: 'w-[50%]' }
          ])
        }}
      />
    </LayoutOrganism>
  );
}
