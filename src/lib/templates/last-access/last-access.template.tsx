import { ILastAccessData } from '../../../shared/interfaces/last-access.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TotalsCard from '../../atoms/totals-card/totals-card.atom';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Input from '../../atoms/input/input.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsLastAccessTemplate = {
  data: ILastAccessData[];
};

export default function LastAccessTemplate({ data }: PropsLastAccessTemplate) {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ILastAccessData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const [course, setCourse] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [dateOne, setdateOne] = useState<string>('');
  const [dateTwo, setdateTwo] = useState<string>('');

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let categories = dataTable.map((a: ILastAccessData) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: ILastAccessData) => a.curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (category: string, course: string, dateOne: string, dateTwo: string) => {
    setFilterStarted(true);
    if (category && dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (access: ILastAccessData) =>
            access.Categoria === category &&
            access.fecha &&
            access.fecha.substring(0, 10) >= dateOne &&
            access.fecha.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (category && course) {
      setDataTable(
        dataTable.filter((access: ILastAccessData) => access.Categoria === category && access.curso === course)
      );
      return;
    }
    if (dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (access: ILastAccessData) =>
            access.fecha && access.fecha.substring(0, 10) >= dateOne && access.fecha.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (course) {
      setDataTable(dataTable.filter((access: ILastAccessData) => access.curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((access: ILastAccessData) => access.Categoria === category));
      return;
    }
    if (dateOne) {
      console.log(dateOne);
      setDataTable(
        dataTable.filter((access: ILastAccessData) => access.fecha && access.fecha.substring(0, 10) == dateOne)
      );
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
    setCategory('');
    setdateOne('');
    setdateTwo('');
  };

  return (
    <LayoutOrganism title='Data Charts - Last Access' name='description' content='Last access page.'>
      <div className='flex justify-between items-end mb-4'>
        <div className='w-[900px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
            customClass='w-[170px]'
            flexCol
          />
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoriesOptions ? categoriesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
            flexCol
          />
          <Input
            type='date'
            value={dateOne}
            setValue={setdateOne}
            label='Fecha inicio:'
            customClass='w-[170px] uppercase'
            flexCol
          />
          <Input
            type='date'
            value={dateTwo}
            setValue={setdateTwo}
            label='Fecha fin:'
            customClass={`${!dateOne ? 'cursor-not-allowed' : ''} w-[170px] uppercase`}
            disabled={!dateOne && true}
            flexCol
          />
        </div>
        <div className='w-[150px] flex justify-between items-center'>
          <ButtonAtom
            content='Filtrar'
            onClick={() => filter(category, course, dateOne, dateTwo)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
        </div>
      </div>
      <TotalsCard title={dataTable.length} subTitle='Total de Ultimos Accesos' />
      <TableOrganism
        data={{
          headCells: [
            { content: 'Nombre', width: 'w-[250px]' },
            { content: 'Apellidos', width: 'w-[250px]' },
            { content: 'usuario', width: 'w-[300px]' },
            { content: 'curso', width: 'w-[400px]' },
            { content: 'Categoria', width: 'w-[200px]' },
            { content: 'fecha', width: 'w-[200px]' },
            { content: 'Ultimo_acceso_dias', width: 'w-[200px]' }
          ],
          bodyCells: dataTable.map((access: ILastAccessData) => [
            { content: access.Nombre, width: 'w-[250px]' },
            { content: access.Apellidos, width: 'w-[250px]' },
            { content: access.usuario, width: 'w-[300px]' },
            { content: access.curso, width: 'w-[400px]' },
            { content: access.Categoria, width: 'w-[200px]' },
            { content: access.fecha, width: 'w-[200px]' },
            { content: access.Ultimo_acceso_dias, width: 'w-[200px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
