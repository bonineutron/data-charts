import { IUserData, IDataChart } from '../../../shared/interfaces/online-users.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import { Months } from '../../../shared/enums/online-users.enum';
import TableOrganism from '../../organisms/table/table.organism';
import Select from '../../atoms/select/select.atom';
import Button from '../../atoms/button/button.atom';
import Input from '../../atoms/input/input.atom';
import { FiUser, FiUsers } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import { CSVLink } from 'react-csv';

type PropsOnlineUsersTemplate = {
  data: IUserData[];
};

export default function OnlineUsersTemplate({ data }: PropsOnlineUsersTemplate): JSX.Element {
  // consts
  const currentDate = new Date();
  const classDays =
    'h-[60px] pl-4 bg-gray-100 text-gray-600 font-semibold flex items-center border-y-[1px] border-l-[1px]';
  const cellsChart = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41
  ];

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataChart, setDataChart] = useState<IDataChart[]>([]);
  const [dataTable, setDataTable] = useState<IUserData[]>([]);
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [dateLabel, setDateLabel] = useState<string>('');

  // effects
  useEffect(() => {
    if (data.length) {
      setDataTable([...data]);
      setDateLabel(monthLabel(month) + ' - ' + year);
      // first set in data chart
      firstDataChart();
    }
  }, [data]);
  useEffect(() => {
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // data chart
    if (dataTable.length && filterStarted) {
      setDateLabel(monthLabel(month) + ' - ' + year);
      generateDataChart(dataTable);
    } else {
      firstDataChart();
    }
  }, [filterStarted]);

  // methods
  const filter = (year: number, month: number) => {
    if (year && month) {
      setFilterStarted(true);
      setDataTable(
        dataTable.filter(
          (user: IUserData) =>
            user.Fecha && Number(user.Fecha.substring(0, 4)) == year && Number(user.Fecha.substring(5, 7)) == month
        )
      );
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    setDateLabel(monthLabel(month) + ' - ' + year);
  };
  const assignId = (day: number): number => {
    let date = new Date(year, month - 1, 1);
    let startCell = (date.getDay() - 1 === -1 ? 6 : date.getDay() - 1) - 1;
    return day + startCell;
  };
  const generateDataChart = (dataUsers: IUserData[]) => {
    // withdraw one day for repeated days
    let days = dataUsers.map((day: IUserData) => day.Fecha && day.Fecha.substring(0, 10));
    let unifyDays = days.filter((item: string | null, index: number) => days.indexOf(item) === index);
    // separate by days in lists
    let separateDays: IUserData[][] = [];
    for (let i: number = 0; i < unifyDays.length; i++) {
      separateDays.push(dataUsers.filter((day: IUserData) => day.Fecha && day.Fecha.substring(0, 10) === unifyDays[i]));
    }
    // separate by online users in lists
    let separateUsersOnline = separateDays.map((days: IUserData[]) => ({
      day: days[0].Dia,
      users: days.map((day: IUserData) => day.usuarios_online)
    }));
    // create object with sum of users and ids
    let sumOnlineUsers = separateUsersOnline.map((user) => ({
      day: user.day,
      cellId: user.day && assignId(user.day),
      users: user.users && user.users.reduce((prev: number, curr: number | null) => prev + Number(curr), 0)
    }));
    setDataChart(sumOnlineUsers);
  };
  const firstDataChart = () => {
    let firstData = data.filter(
      (user: IUserData) =>
        user.Fecha && Number(user.Fecha.substring(0, 4)) == year && Number(user.Fecha.substring(5, 7)) == month
    );
    generateDataChart(firstData);
  };
  const monthLabel = (month: number): string => {
    if (month === 1) return Months.January;
    if (month === 2) return Months.February;
    if (month === 3) return Months.March;
    if (month === 4) return Months.April;
    if (month === 5) return Months.May;
    if (month === 6) return Months.June;
    if (month === 7) return Months.July;
    if (month === 8) return Months.August;
    if (month === 9) return Months.September;
    if (month === 10) return Months.Octuber;
    if (month === 11) return Months.November;
    if (month === 12) return Months.December;
    return '';
  };
  const usersColors = (users: number): string => {
    if (users >= 40 && users <= 79) return 'bg-[#F9E79F] text-gray-500';
    if (users >= 80 && users <= 119) return 'bg-[#E59866] text-gray-500';
    if (users >= 120) return 'bg-[#CD6155] text-white';
    return 'bg-[#FCF3CF] text-gray-500';
  };

  return (
    <LayoutOrganism title='Data Charts - Online Users' name='description' content='Online users page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[600px] flex justify-between'>
          <Select
            options={[
              { value: 1, label: Months.January },
              { value: 2, label: Months.February },
              { value: 3, label: Months.March },
              { value: 4, label: Months.April },
              { value: 5, label: Months.May },
              { value: 6, label: Months.June },
              { value: 7, label: Months.July },
              { value: 8, label: Months.August },
              { value: 9, label: Months.September },
              { value: 10, label: Months.Octuber },
              { value: 11, label: Months.November },
              { value: 12, label: Months.December }
            ]}
            value={month}
            setValue={setMonth}
            label='Mes:'
            customClass='w-[170px]'
          />
          <Input type='text' value={year} setValue={setYear} label='Año:' customClass='w-[170px]' />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <Button content='Filtrar' onClick={() => filter(year, month)} customClass='shadow-lg' />
          <Button content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='mb-2'>
        <h2 className='w-fit mx-auto font-semibold text-[20px] my-2'>{dateLabel}</h2>
        <ol className='grid grid-cols-7'>
          <li className={classDays}>Lun</li>
          <li className={classDays}>Mar</li>
          <li className={classDays}>Mie</li>
          <li className={classDays}>Jue</li>
          <li className={classDays}>Vie</li>
          <li className={classDays}>Sab</li>
          <li className={`${classDays} border-r-[1px]`}>Dom</li>
          {cellsChart.map((cell: number) => (
            <li
              key={cell}
              className={`h-[60px] border-b-[1px] border-l-[1px] ${
                cell === 6 || cell === 13 || cell === 20 || cell === 27 || cell === 34 || cell === 41
                  ? 'border-r-[1px]'
                  : ''
              }`}>
              {dataChart.map(
                (day: IDataChart) =>
                  cell === day.cellId && (
                    <div className={`relative h-full w-full flex flex-col justify-between ${usersColors(day.users)}`}>
                      <span className='pr-2 text-right text-gray-400 italic text-sm'>{day.day}</span>
                      <span className='absolute h-full w-full flex items-center justify-center gap-1 font-semibold'>
                        {day.users === 1 ? <FiUser className='text-[20px]' /> : <FiUsers className='text-[20px]' />}
                        {day.users}
                      </span>
                    </div>
                  )
              )}
            </li>
          ))}
        </ol>
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
