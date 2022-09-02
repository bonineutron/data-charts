import { ILoginsData } from '../../../shared/interfaces/logins.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import Button from '../../atoms/button/button.atom';
import Input from '../../atoms/input/input.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsLoginsTemplate = {
  data: ILoginsData[];
};

export default function LoginsTemplate({ data }: PropsLoginsTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ILoginsData[]>([]);
  const [dateOne, setdateOne] = useState<string>('');
  const [dateTwo, setdateTwo] = useState<string>('');

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (dateOne: string, dateTwo: string) => {
    setFilterStarted(true);
    if (dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (login: ILoginsData) =>
            login.Fecha && login.Fecha.substring(0, 10) >= dateOne && login.Fecha.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (dateOne) {
      setDataTable(dataTable.filter((login: ILoginsData) => login.Fecha && login.Fecha.substring(0, 10) == dateOne));
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setdateOne('');
    setdateTwo('');
  };

  return (
    <LayoutOrganism title='Data Charts - Logins' name='description' content='Logins page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[600px] flex justify-between'>
          <Input
            type='date'
            value={dateOne}
            setValue={setdateOne}
            label='Fecha inicio:'
            customClass='w-[170px] uppercase'
          />
          <Input
            type='date'
            value={dateTwo}
            setValue={setdateTwo}
            label='Fecha fin:'
            customClass={`${!dateOne ? 'cursor-not-allowed' : ''} w-[170px] uppercase`}
            disabled={!dateOne && true}
          />
        </div>
        <div className='w-[150px] flex justify-between items-center'>
          <Button content='Filtrar' onClick={() => filter(dateOne, dateTwo)} customClass='shadow-lg' />
          <Button content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
        </div>
      </div>
      <TableOrganism
        data={{
          headCells: [
            { content: 'Fecha', width: 'w-[200px]' },
            { content: 'Anio', width: 'w-[100px]' },
            { content: 'Mes', width: 'w-[100px]' },
            { content: 'semana', width: 'w-[100px]' },
            { content: 'Dia', width: 'w-[100px]' },
            { content: 'Usuario', width: 'w-[100px]' }
          ],
          bodyCells: dataTable.map((login: ILoginsData) => [
            { content: login.Fecha, width: 'w-[200px]' },
            { content: login.Anio, width: 'w-[100px]' },
            { content: login.Mes, width: 'w-[100px]' },
            { content: login.semana, width: 'w-[100px]' },
            { content: login.Dia, width: 'w-[100px]' },
            { content: login.Usuario, width: 'w-[100px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
