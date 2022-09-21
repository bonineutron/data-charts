import { ICompletedActivitiesData } from '../../../shared/interfaces/completed-activities.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import { useState, useEffect, useRef, useCallback } from 'react';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Bar from '../../organisms/bar/bar.organism';
import { MdRefresh } from 'react-icons/md';
import { toPng } from 'html-to-image';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

type PropsCompletedActivitiesTemplate = {
  data: ICompletedActivitiesData[];
};

export default function CompletedActivitiesTemplate({ data }: PropsCompletedActivitiesTemplate): JSX.Element {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ICompletedActivitiesData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const [categoriesOptions1, setCategoriesOptions1] = useState<any>([]);
  const [categoriesOptions2, setCategoriesOptions2] = useState<any>([]);
  const [sectionsOptions, setSectionOptions] = useState<any>([]);
  const [course, setCourse] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [category1, setCategory1] = useState<string>('');
  const [category2, setCategory2] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [activity, setActivity] = useState<string>('');
  const [activitiesOptions, setActivitiesOptions] = useState<any>([]);
  // bar states
  const [categoriesBarValues, setCategoriesBarValues] = useState<number[]>([]);
  const [coursesBarValues, setCoursesBarValues] = useState<number[]>([]);
  const [sectionBarValues, setSectionBarValues] = useState<number[]>([]);
  const [activitiesBarValues, setActivitiesBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let categories = dataTable.map((a: ICompletedActivitiesData) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // category 1 filtering
    let categories1 = dataTable.map((a: ICompletedActivitiesData) => a.Categoria1);
    setCategoriesOptions1(
      categories1.filter((item: string | null, index: number) => categories1.indexOf(item) === index)
    );
    // category 2 filtering
    let categories2 = dataTable.map((a: ICompletedActivitiesData) => a.Categoria2);
    setCategoriesOptions2(
      categories2.filter((item: string | null, index: number) => categories2.indexOf(item) === index)
    );
    // courses filtering
    let courses = dataTable.map((a: ICompletedActivitiesData) => a.Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // section filtering
    let sections = dataTable.map((a: ICompletedActivitiesData) => a.Seccion);
    setSectionOptions(sections.filter((item: string | null, index: number) => sections.indexOf(item) === index));
    // section filtering
    let activities = dataTable.map((a: ICompletedActivitiesData) => a.Actividad);
    setActivitiesOptions(activities.filter((item: string | null, index: number) => activities.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // categories data bar chart
    let separateCategories: ICompletedActivitiesData[][] = [];
    for (let i: number = 0; i < categoriesOptions.length; i++) {
      separateCategories.push(
        dataTable.filter((category: ICompletedActivitiesData) => category.Categoria === categoriesOptions[i])
      );
    }
    let separateFinished = separateCategories.map((categories: ICompletedActivitiesData[]) =>
      categories.map((category: ICompletedActivitiesData) => category.Finalizacion)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setCategoriesBarValues(completionCount);
  }, [categoriesOptions]);
  useEffect(() => {
    // courses data bar chart
    let separateCourses: ICompletedActivitiesData[][] = [];
    for (let i: number = 0; i < coursesOptions.length; i++) {
      separateCourses.push(dataTable.filter((course: ICompletedActivitiesData) => course.Curso === coursesOptions[i]));
    }
    let separateFinished = separateCourses.map((courses: ICompletedActivitiesData[]) =>
      courses.map((course: ICompletedActivitiesData) => course.Finalizacion)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setCoursesBarValues(completionCount);
  }, [coursesOptions]);
  useEffect(() => {
    // sections data bar chart
    let separateCourses: ICompletedActivitiesData[][] = [];
    for (let i: number = 0; i < sectionsOptions.length; i++) {
      separateCourses.push(
        dataTable.filter((course: ICompletedActivitiesData) => course.Seccion === sectionsOptions[i])
      );
    }
    let separateFinished = separateCourses.map((courses: ICompletedActivitiesData[]) =>
      courses.map((course: ICompletedActivitiesData) => course.Finalizacion)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setSectionBarValues(completionCount);
  }, [sectionsOptions]);
  useEffect(() => {
    // sections data bar chart
    let separateCourses: ICompletedActivitiesData[][] = [];
    for (let i: number = 0; i < activitiesOptions.length; i++) {
      separateCourses.push(
        dataTable.filter((course: ICompletedActivitiesData) => course.Actividad === activitiesOptions[i])
      );
    }
    let separateFinished = separateCourses.map((courses: ICompletedActivitiesData[]) =>
      courses.map((course: ICompletedActivitiesData) => course.Finalizacion)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setActivitiesBarValues(completionCount);
  }, [activitiesOptions]);

  // methods
  const filter = (
    category: string,
    category1: string,
    category2: string,
    course: string,
    section: string,
    activityFilter: string
  ) => {
    setFilterStarted(true);
    if (course) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Categoria === category));
      return;
    }
    if (category1) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Categoria1 === category1));
      return;
    }
    if (category2) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Categoria2 === category2));
      return;
    }
    if (section) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Seccion === section));
      return;
    }
    if (activityFilter) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Actividad === activityFilter));
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
    setActivity('');
    setSection('');
    setCategory('');
    setCategory1('');
    setCategory2('');
  };
  const generatePdf = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const imgData = dataUrl;
        const pdf = new jsPDF('p', 'mm', [210, 410]);
        pdf.addImage(imgData, 'PNG', 5, 5, 200, 400);
        pdf.save('download.pdf');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <LayoutOrganism title='Data Charts - Completed Activities' name='description' content='Completed activities page.'>
      <div className='flex justify-between items-end mb-4'>
        <div className='w-[950px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
            customClass='w-[150px]'
            flexCol
          />
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoriesOptions ? categoriesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[150px]'
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
            customClass='w-[150px]'
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
            customClass='w-[150px]'
            flexCol
          />
          <Select
            value={section}
            label='Secciones:'
            setValue={setSection}
            options={
              sectionsOptions ? sectionsOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[150px]'
            flexCol
          />
          <Select
            value={activity}
            label='Actividades:'
            setValue={setActivity}
            options={
              activitiesOptions ? activitiesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[150px]'
            flexCol
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom
            content='Filtrar'
            onClick={() => filter(category, category1, category2, course, section, activity)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <Bar dataBar={categoriesBarValues} labels={categoriesOptions} title='Finalizados por Categorias' />
        <Bar dataBar={coursesBarValues} labels={coursesOptions} title='Finalizados por Cursos' />
        <Bar dataBar={sectionBarValues} labels={sectionsOptions} title='Finalizados por Seccion' />
        <Bar dataBar={activitiesBarValues} labels={activitiesOptions} title='Finalizados por Actividad' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Usuario', width: 'w-[110px]' },
              { content: 'Nombre', width: 'w-[200px]' },
              { content: 'Apellido', width: 'w-[200px]' },
              { content: 'Email', width: 'w-[350px]' },
              { content: 'Categoría', width: 'w-[200px]' },
              { content: 'Categoría 1', width: 'w-[200px]' },
              { content: 'Categoría 2', width: 'w-[200px]' },
              { content: 'Curso', width: 'w-[400px]' },
              { content: 'Seccion', width: 'w-[400px]' },
              { content: 'Actividad', width: 'w-[400px]' },
              { content: 'Tipo', width: 'w-[100px]' },
              { content: 'Finalizacion', width: 'w-[100px]' },
              { content: 'Fecha de finalización', width: 'w-[300px]' }
            ],
            bodyCells: dataTable.map((activity: ICompletedActivitiesData) => [
              { content: activity.Usuario, width: 'w-[110px]' },
              { content: activity.Nombre, width: 'w-[200px]' },
              { content: activity.Apellido, width: 'w-[200px]' },
              { content: activity.Email, width: 'w-[350px]' },
              { content: activity.Categoria, width: 'w-[200px]' },
              { content: activity.Categoria1, width: 'w-[200px]' },
              { content: activity.Categoria2, width: 'w-[200px]' },
              { content: activity.Curso, width: 'w-[400px]' },
              { content: activity.Seccion, width: 'w-[400px]' },
              { content: activity.Actividad, width: 'w-[400px]' },
              { content: activity.tipo, width: 'w-[100px]' },
              {
                content: activity.Finalizacion,
                width: 'w-[100px]',
                colorRow: activity.Finalizacion === 1 ? 'green' : 'red'
              },
              { content: activity.fecha_finalización, width: 'w-[300px]' }
            ])
          }}
          messageNotFound={MessageNotFound}
        />
      </div>
      <div className='text-center'>
        <ButtonAtom
          content='Exportar PDF'
          onClick={() => generatePdf()}
          customClass='shadow-lg text-[16px] bg-[#C0392B] mt-4'
        />
      </div>
    </LayoutOrganism>
  );
}
