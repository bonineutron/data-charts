import { ICompletedCoursesData } from '../../../shared/interfaces/completed-courses.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import { CSVLink } from 'react-csv';
import Bar from '../../organisms/bar/bar.organism';

type PropsCompletedCoursesTemplate = {
  data: ICompletedCoursesData[];
};

export default function CompletedCoursesTemplate({ data }: PropsCompletedCoursesTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ICompletedCoursesData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const [categoriesOptions1, setCategoriesOptions1] = useState<any>([]);
  const [categoriesOptions2, setCategoriesOptions2] = useState<any>([]);
  const [course, setCourse] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [category1, setCategory1] = useState<string>('');
  const [category2, setCategory2] = useState<string>('');
  // bar states
  const [categoriesBarValues, setCategoriesBarValues] = useState<number[]>([]);
  const [coursesBarValues, setCoursesBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let categories = dataTable.map((a: ICompletedCoursesData) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // module filtering
    let categories1 = dataTable.map((a: ICompletedCoursesData) => a.Categoria1);
    setCategoriesOptions1(
      categories1.filter((item: string | null, index: number) => categories1.indexOf(item) === index)
    );
    // module filtering
    let categories2 = dataTable.map((a: ICompletedCoursesData) => a.Categoria2);
    setCategoriesOptions2(
      categories2.filter((item: string | null, index: number) => categories2.indexOf(item) === index)
    );
    // courses filtering
    let courses = dataTable.map((a: ICompletedCoursesData) => a.Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // categories data bar chart
    let separateCategories: ICompletedCoursesData[][] = [];
    for (let i: number = 0; i < categoriesOptions.length; i++) {
      separateCategories.push(
        dataTable.filter((category: ICompletedCoursesData) => category.Categoria === categoriesOptions[i])
      );
    }
    let separateFinished = separateCategories.map((categories: ICompletedCoursesData[]) =>
      categories.map((category: ICompletedCoursesData) => category.estado)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setCategoriesBarValues(completionCount);
  }, [categoriesOptions]);
  useEffect(() => {
    // courses data bar chart
    let separateCourses: ICompletedCoursesData[][] = [];
    for (let i: number = 0; i < coursesOptions.length; i++) {
      separateCourses.push(dataTable.filter((course: ICompletedCoursesData) => course.Curso === coursesOptions[i]));
    }
    let separateFinished = separateCourses.map((courses: ICompletedCoursesData[]) =>
      courses.map((course: ICompletedCoursesData) => course.estado)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setCoursesBarValues(completionCount);
  }, [coursesOptions]);

  // methods
  const filter = (category: string, course: string, category1: string, category2: string) => {
    setFilterStarted(true);

    if (course) {
      setDataTable(dataTable.filter((activity: ICompletedCoursesData) => activity.Curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((activity: ICompletedCoursesData) => activity.Categoria === category));
    }
    if (category1) {
      setDataTable(dataTable.filter((activity: ICompletedCoursesData) => activity.Categoria1 === category1));
    }
    if (category2) {
      setDataTable(dataTable.filter((activity: ICompletedCoursesData) => activity.Categoria2 === category2));
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
    setCategory('');
    setCategory1('');
    setCategory2('');
  };

  return (
    <LayoutOrganism title='Data Charts - Activities' name='description' content='Activities page.'>
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
              categoriesOptions ? categoriesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
            flexCol
          />
          <Select
            value={category1}
            label='Categoría 1:'
            setValue={setCategory1}
            options={
              categoriesOptions1
                ? categoriesOptions1.map((category: any) => ({ value: category, label: category }))
                : []
            }
            customClass='w-[170px]'
            flexCol
          />
          <Select
            value={category2}
            label='Categoría 2:'
            setValue={setCategory2}
            options={
              categoriesOptions2
                ? categoriesOptions2.map((category: any) => ({ value: category, label: category }))
                : []
            }
            flexCol
            customClass='w-[170px]'
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom
            content='Filtrar'
            onClick={() => filter(category, course, category1, category2)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <Bar dataBar={coursesBarValues} labels={coursesOptions} title='Finalizados por Cursos' />
      <Bar dataBar={categoriesBarValues} labels={categoriesOptions} title='Finalizados por Categorias' />
      <TableOrganism
        data={{
          headCells: [
            { content: 'Usuario', width: 'w-[100px]' },
            { content: 'Nombre', width: 'w-[200px]' },
            { content: 'Apellido', width: 'w-[200px]' },
            { content: 'Email', width: 'w-[350px]' },
            { content: 'Curso', width: 'w-[400px]' },
            { content: 'Curso corto', width: 'w-[150px]' },
            { content: 'Categoria', width: 'w-[150px]' },
            { content: 'Categoria1', width: 'w-[150px]' },
            { content: 'Estado de finalización', width: 'w-[100px]' },
            { content: 'Fecha finalización', width: 'w-[150px]' }
          ],
          bodyCells: dataTable.map((course: ICompletedCoursesData) => [
            { content: course.Usuario, width: 'w-[100px]' },
            { content: course.Nombre, width: 'w-[200px]' },
            { content: course.Apellido, width: 'w-[200px]' },
            { content: course.Email, width: 'w-[350px]' },
            { content: course.Curso, width: 'w-[400px]' },
            { content: course.cursocorto, width: 'w-[150px]' },
            { content: course.Categoria, width: 'w-[150px]' },
            { content: course.Categoria1, width: 'w-[150px]' },
            { content: course.estado, width: 'w-[100px]', colorRow: course.estado === 1 ? 'green' : 'red' },
            { content: course.Curso_Finalizado, width: 'w-[150px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
