import { IStateCourseData } from '../../../shared/interfaces/state-courses.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Input from '../../atoms/input/input.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsStateCoursesTemplatee = {
  data: IStateCourseData[];
};

export default function StateCoursesTemplate({ data }: PropsStateCoursesTemplatee): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IStateCourseData[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [category, setCategory] = useState<string>('');
  const [dateOne, setdateOne] = useState<string>('');
  const [dateTwo, setdateTwo] = useState<string>('');

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // categories filtering
    let categories = dataTable.map((a: IStateCourseData) => a.Categoria);
    setCategoryOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (category: string, dateOne: string, dateTwo: string) => {
    setFilterStarted(true);
    if (category && dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (course: IStateCourseData) =>
            course.Categoria === category &&
            course.fecha_creacion &&
            course.fecha_creacion.substring(0, 10) >= dateOne &&
            course.fecha_creacion.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (category && dateOne) {
      setDataTable(
        dataTable.filter(
          (course: IStateCourseData) =>
            course.Categoria === category && course.fecha_creacion && course.fecha_creacion.substring(0, 10) == dateOne
        )
      );
      return;
    }
    if (dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (course: IStateCourseData) =>
            course.fecha_creacion &&
            course.fecha_creacion.substring(0, 10) >= dateOne &&
            course.fecha_creacion.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((course: IStateCourseData) => course.Categoria === category));
      return;
    }
    if (dateOne) {
      setDataTable(
        dataTable.filter(
          (course: IStateCourseData) => course.fecha_creacion && course.fecha_creacion.substring(0, 10) == dateOne
        )
      );
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCategory('');
    setdateOne('');
    setdateTwo('');
  };

  return (
    <LayoutOrganism title='Data Charts - State Courses' name='description' content='State courses page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[900px] flex justify-between'>
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoryOptions ? categoryOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
          />
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
          <ButtonAtom content='Filtrar' onClick={() => filter(category, dateOne, dateTwo)} customClass='shadow-lg' />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
        </div>
      </div>
      <TableOrganism
        data={{
          headCells: [
            { content: 'Curso', width: 'w-[300px]' },
            { content: 'Codigo_curso', width: 'w-[150px]' },
            { content: 'fecha_creacion', width: 'w-[200px]' },
            { content: 'fecha_inicio', width: 'w-[200px]' },
            { content: 'fecha_cierre', width: 'w-[200px]' },
            { content: 'Estado', width: 'w-[100px]' },
            { content: 'Categoria', width: 'w-[200px]' },
            { content: 'tipo_curso', width: 'w-[100px]' }
          ],
          bodyCells: dataTable.map((course: IStateCourseData) => [
            { content: course.Curso, width: 'w-[300px]' },
            { content: course.Codigo_curso, width: 'w-[150px]' },
            { content: course.fecha_creacion, width: 'w-[200px]' },
            { content: course.fecha_inicio, width: 'w-[200px]' },
            { content: course.fecha_cierre, width: 'w-[200px]' },
            { content: course.Estado, width: 'w-[100px]' },
            { content: course.Categoria, width: 'w-[200px]' },
            { content: course.tipo_curso, width: 'w-[100px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
