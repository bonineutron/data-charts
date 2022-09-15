import { INotAccessData } from '../../../shared/interfaces/not-access.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TotalsCard from '../../atoms/totals-card/totals-card.atom';
import TableOrganism from '../../organisms/table/table.organism';
import { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../../atoms/button/button.atom';
import Input from '../../atoms/input/input.atom';
import { MdRefresh } from 'react-icons/md';
import { toPng } from 'html-to-image';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

type PropsNotAccessTemplate = {
  data: INotAccessData[];
};

export default function NotAccessTemplate({ data }: PropsNotAccessTemplate): JSX.Element {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<INotAccessData[]>([]);
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
          (access: INotAccessData) =>
            access.Fecha_creacion &&
            access.Fecha_creacion.substring(0, 10) >= dateOne &&
            access.Fecha_creacion.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (dateOne) {
      setDataTable(
        dataTable.filter(
          (access: INotAccessData) => access.Fecha_creacion && access.Fecha_creacion.substring(0, 10) == dateOne
        )
      );
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
  const generatePdf = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const imgData = dataUrl;
        const pdf = new jsPDF('p', 'mm', [210, 200]);
        pdf.addImage(imgData, 'PNG', 5, 5, 190, 190);
        pdf.save('download.pdf');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <LayoutOrganism title='Data Charts - Not Access' name='description' content='Not access page.'>
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
        <div className='w-[200px] flex justify-between items-center'>
          <Button content='Filtrar' onClick={() => filter(dateOne, dateTwo)} customClass='shadow-lg' />
          <Button content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <TotalsCard title={dataTable.length} subTitle='Total de usuarios que no han accedido' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Nombres', width: 'w-[200px]' },
              { content: 'Apellidos', width: 'w-[200px]' },
              { content: 'Usuario', width: 'w-[110px]' },
              { content: 'Correo', width: 'w-[350px]' },
              { content: 'Ciudad', width: 'w-[200px]' },
              { content: 'Pais', width: 'w-[100px]' },
              { content: 'Fecha_creacion', width: 'w-[200px]' }
            ],
            bodyCells: dataTable.map((access: INotAccessData) => [
              { content: access.Nombres, width: 'w-[200px]' },
              { content: access.Apellidos, width: 'w-[200px]' },
              { content: access.Usuario, width: 'w-[110px]' },
              { content: access.Correo, width: 'w-[350px]' },
              { content: access.Ciudad, width: 'w-[200px]' },
              { content: access.Pais, width: 'w-[100px]' },
              { content: access.Fecha_creacion, width: 'w-[200px]' }
            ])
          }}
          messageNotFound={MessageNotFound}
        />
      </div>
      <div className='text-center'>
        <Button
          content='Exportar PDF'
          onClick={() => generatePdf()}
          customClass='shadow-lg text-[16px] bg-[#C0392B] mt-4'
        />
      </div>
    </LayoutOrganism>
  );
}
