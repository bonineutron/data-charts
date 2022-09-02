import { IUserData } from '../../../shared/interfaces/online-users.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import Button from '../../atoms/button/button.atom';
import Input from '../../atoms/input/input.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsOnlineUsersTemplate = {
  data: IUserData[];
};

export default function OnlineUsersTemplate({ data }: PropsOnlineUsersTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IUserData[]>([]);
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
          (user: IUserData) =>
            user.Fecha && user.Fecha.substring(0, 10) >= dateOne && user.Fecha.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (dateOne) {
      setDataTable(dataTable.filter((user: IUserData) => user.Fecha && user.Fecha.substring(0, 10) == dateOne));
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
    <LayoutOrganism title='Data Charts - Online Users' name='description' content='Online users page.'>
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
            { content: 'Semana', width: 'w-[100px]' },
            { content: 'Dia', width: 'w-[100px]' },
            { content: 'Dia_semana', width: 'w-[150px]' },
            { content: 'Tiempo', width: 'w-[100px]' },
            { content: 'Hora', width: 'w-[100px]' },
            { content: 'Minuto', width: 'w-[100px]' },
            { content: 'Fecha2', width: 'w-[200px]' },
            { content: 'Anio2', width: 'w-[100px]' },
            { content: 'Mes2', width: 'w-[100px]' },
            { content: 'Semana2', width: 'w-[100px]' },
            { content: 'Dia2', width: 'w-[100px]' },
            { content: 'Dia_semana2', width: 'w-[150px]' },
            { content: 'Tiempo2', width: 'w-[100px]' },
            { content: 'Hora2', width: 'w-[100px]' },
            { content: 'Minuto2', width: 'w-[100px]' },
            { content: 'usuarios_online', width: 'w-[150px]' }
          ],
          bodyCells: dataTable.map((user: IUserData) => [
            { content: user.Fecha, width: 'w-[200px]' },
            { content: user.Anio, width: 'w-[100px]' },
            { content: user.Mes, width: 'w-[100px]' },
            { content: user.Semana, width: 'w-[100px]' },
            { content: user.Dia, width: 'w-[100px]' },
            { content: user.Dia_semana, width: 'w-[150px]' },
            { content: user.Tiempo, width: 'w-[100px]' },
            { content: user.Hora, width: 'w-[100px]' },
            { content: user.Minuto, width: 'w-[100px]' },
            { content: user.Fecha2, width: 'w-[200px]' },
            { content: user.Anio2, width: 'w-[100px]' },
            { content: user.Mes2, width: 'w-[100px]' },
            { content: user.Semana2, width: 'w-[100px]' },
            { content: user.Dia2, width: 'w-[100px]' },
            { content: user.Dia_semana2, width: 'w-[150px]' },
            { content: user.Tiempo2, width: 'w-[100px]' },
            { content: user.Hora2, width: 'w-[100px]' },
            { content: user.Minuto2, width: 'w-[100px]' },
            { content: user.usuarios_online, width: 'w-[150px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
