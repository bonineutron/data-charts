import { IClickDataCourses } from '../../../shared/interfaces/click-courses.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Bar from '../../organisms/bar/bar.organism';
import Input from '../../atoms/input/input.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import { CSVLink } from 'react-csv';

type PropsClickCoursesTemplate = {
  data: IClickDataCourses[];
};

export default function ClickCoursesTemplate({ data }: PropsClickCoursesTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IClickDataCourses[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [category, setCategory] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [dateOne, setdateOne] = useState<string>('');
  const [dateTwo, setdateTwo] = useState<string>('');
  // bar states
  const [categoriesBarValues, setCategoriesBarValues] = useState<number[]>([]);
  const [coursesBarValues, setCoursesBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // categories filtering
    let categories = dataTable.map((category: IClickDataCourses) => category.Categoria);
    setCategoryOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((course: IClickDataCourses) => course.Nombre_Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // categories data bar chart
    let separateCategories: IClickDataCourses[][] = [];
    for (let i: number = 0; i < categoryOptions.length; i++) {
      separateCategories.push(
        dataTable.filter((category: IClickDataCourses) => category.Categoria === categoryOptions[i])
      );
    }
    let separateClicks = separateCategories.map((categories: IClickDataCourses[]) =>
      categories.map((category: IClickDataCourses) => category.Clics)
    );
    let completionCount: number[] = separateClicks.map((ending: (number | null)[]) =>
      ending.reduce((prev: number, curr: number | null) => prev + Number(curr), 0)
    );
    setCategoriesBarValues(completionCount);
  }, [categoryOptions]);
  useEffect(() => {
    // courses data bar chart
    let separateCourses: IClickDataCourses[][] = [];
    for (let i: number = 0; i < coursesOptions.length; i++) {
      separateCourses.push(
        dataTable.filter((category: IClickDataCourses) => category.Nombre_Curso === coursesOptions[i])
      );
    }
    let separateClicks = separateCourses.map((categories: IClickDataCourses[]) =>
      categories.map((category: IClickDataCourses) => category.Clics)
    );
    let completionCount: number[] = separateClicks.map((ending: (number | null)[]) =>
      ending.reduce((prev: number, curr: number | null) => prev + Number(curr), 0)
    );
    setCoursesBarValues(completionCount);
  }, [coursesOptions]);

  // methods
  const filter = (category: string, course: string, dateOne: string, dateTwo: string) => {
    setFilterStarted(true);
    if (category && dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (course: IClickDataCourses) =>
            course.Categoria === category &&
            course.Fecha &&
            course.Fecha.substring(0, 10) >= dateOne &&
            course.Fecha.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (category && course) {
      setDataTable(
        dataTable.filter((access: IClickDataCourses) => access.Categoria === category && access.Nombre_Curso === course)
      );
      return;
    }
    if (category && dateOne) {
      setDataTable(
        dataTable.filter(
          (course: IClickDataCourses) =>
            course.Categoria === category && course.Fecha && course.Fecha.substring(0, 10) == dateOne
        )
      );
      return;
    }
    if (dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (course: IClickDataCourses) =>
            course.Fecha && course.Fecha.substring(0, 10) >= dateOne && course.Fecha.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (course) {
      setDataTable(dataTable.filter((access: IClickDataCourses) => access.Nombre_Curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((course: IClickDataCourses) => course.Categoria === category));
      return;
    }
    if (dateOne) {
      setDataTable(
        dataTable.filter((course: IClickDataCourses) => course.Fecha && course.Fecha.substring(0, 10) == dateOne)
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
    <LayoutOrganism title='Data Charts - Click Courses' name='description' content='Click courses page.'>
      <div className='flex justify-between items-end mb-4'>
        <div className='w-[800px] flex justify-between'>
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
              categoryOptions ? categoryOptions.map((category: any) => ({ value: category, label: category })) : []
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
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom
            content='Filtrar'
            onClick={() => filter(category, course, dateOne, dateTwo)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <Bar
        dataBar={categoriesBarValues}
        labels={categoryOptions.map((category: string | null) => (category === null ? 'null' : category))}
        title='Total de Clics por Categoria'
      />
      <Bar
        dataBar={coursesBarValues}
        labels={coursesOptions.map((category: string | null) => (category === null ? 'null' : category))}
        title='Total de Clics por Curso'
      />
      <TableOrganism
        data={{
          headCells: [
            { content: 'id', width: 'w-[50px]' },
            { content: 'Nombre_Corto', width: 'w-[150px]' },
            { content: 'Nombre_Curso', width: 'w-[400px]' },
            { content: 'Categoria', width: 'w-[200px]' },
            { content: 'Categoria1', width: 'w-[150px]' },
            { content: 'tipo_curso', width: 'w-[150px]' },
            { content: 'Fecha', width: 'w-[200px]' },
            { content: 'Anio', width: 'w-[100px]' },
            { content: 'Mes', width: 'w-[100px]' },
            { content: 'Dia', width: 'w-[100px]' },
            { content: 'Usuarios', width: 'w-[100px]' },
            { content: 'Clics', width: 'w-[100px]' }
          ],
          bodyCells: dataTable.map((course: IClickDataCourses) => [
            { content: course.id, width: 'w-[50px]' },
            { content: course.Nombre_Corto, width: 'w-[150px]' },
            { content: course.Nombre_Curso, width: 'w-[400px]' },
            { content: course.Categoria, width: 'w-[200px]' },
            { content: course.Categoria1, width: 'w-[150px]' },
            { content: course.tipo_curso, width: 'w-[150px]' },
            { content: course.Fecha, width: 'w-[200px]' },
            { content: course.Anio, width: 'w-[100px]' },
            { content: course.Mes, width: 'w-[100px]' },
            { content: course.Dia, width: 'w-[100px]' },
            { content: course.Usuarios, width: 'w-[100px]' },
            { content: course.Clics, width: 'w-[100px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
