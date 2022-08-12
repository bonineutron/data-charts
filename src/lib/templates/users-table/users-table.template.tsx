import { userDataMock } from '../../../shared/mocks/data-users.mock';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import { IUserData } from '../main/interfaces/main.interface';
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
      <section className='w-full shadow-lg rounded-lg overflow-x-auto'>
        <div className='min-w-[740px] flex p-4 bg-gray-100 rounded-t-lg font-semibold'>
          <div className='w-[20%]'>
            <h2>Code</h2>
          </div>
          <div className='w-[30%]'>
            <h2>Name</h2>
          </div>
          <div className='w-[50%]'>
            <h2>Mail</h2>
          </div>
        </div>
        <div className='min-w-[740px]'>
          {data.map((user: IUserData, index: number) => (
            <div
              key={index}
              className={`flex px-4 py-1 text-gray-600 ${index % 2 && 'bg-gray-100'}`}>
              <div className='w-[20%]'>
                <h3>{user.code}</h3>
              </div>
              <div className='w-[30%]'>
                <h3>{user.name}</h3>
              </div>
              <div className='w-[50%]'>
                <h3>{user.email}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LayoutOrganism>
  );
}
