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
  const [course, setCourse] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  // bar states
  const [categoriesBarValues, setCategoriesBarValues] = useState<number[]>([]);
  const [coursesBarValues, setCoursesBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let categories = dataTable.map((a: ICompletedActivitiesData) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: ICompletedActivitiesData) => a.Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
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

  // methods
  const filter = (category: string, course: string) => {
    setFilterStarted(true);
    if (category && course) {
      setDataTable(
        dataTable.filter(
          (activity: ICompletedActivitiesData) => activity.Categoria === category && activity.Curso === course
        )
      );
      return;
    }
    if (course) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Curso === course));
      return;
    }
    if (category !== '') {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Categoria === category));
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
    setCategory('');
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
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[600px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
            customClass='w-[170px]'
          />
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoriesOptions ? categoriesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(category, course)} customClass='shadow-lg' />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <Bar dataBar={coursesBarValues} labels={coursesOptions} title='Finalizados por Cursos' />
        <Bar dataBar={categoriesBarValues} labels={categoriesOptions} title='Finalizados por Categorias' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'id', width: 'w-[50px]' },
              { content: 'Usuario', width: 'w-[110px]' },
              { content: 'Nombre', width: 'w-[200px]' },
              { content: 'Apellido', width: 'w-[200px]' },
              { content: 'Email', width: 'w-[350px]' },
              { content: 'city', width: 'w-[200px]' },
              { content: 'country', width: 'w-[100px]' },
              { content: 'theme', width: 'w-[100px]' },
              { content: 'idCurso', width: 'w-[100px]' },
              { content: 'idseccion', width: 'w-[100px]' },
              { content: 'Seccion', width: 'w-[400px]' },
              { content: 'Curso', width: 'w-[400px]' },
              { content: 'tipo_curso', width: 'w-[200px]' },
              { content: 'Categoria', width: 'w-[200px]' },
              { content: 'Categoria1', width: 'w-[200px]' },
              { content: 'cursocorto', width: 'w-[200px]' },
              { content: 'Actividad', width: 'w-[400px]' },
              { content: 'orden_actividad', width: 'w-[150px]' },
              { content: 'tipo', width: 'w-[100px]' },
              { content: 'Finalizacion', width: 'w-[100px]' }
            ],
            bodyCells: dataTable.map((activity: ICompletedActivitiesData) => [
              { content: activity.id, width: 'w-[50px]' },
              { content: activity.Usuario, width: 'w-[110px]' },
              { content: activity.Nombre, width: 'w-[200px]' },
              { content: activity.Apellido, width: 'w-[200px]' },
              { content: activity.Email, width: 'w-[350px]' },
              { content: activity.city, width: 'w-[200px]' },
              { content: activity.country, width: 'w-[100px]' },
              { content: activity.theme, width: 'w-[100px]' },
              { content: activity.idCurso, width: 'w-[100px]' },
              { content: activity.idseccion, width: 'w-[100px]' },
              { content: activity.Seccion, width: 'w-[400px]' },
              { content: activity.Curso, width: 'w-[400px]' },
              { content: activity.tipo_curso, width: 'w-[200px]' },
              { content: activity.Categoria, width: 'w-[200px]' },
              { content: activity.Categoria1, width: 'w-[200px]' },
              { content: activity.cursocorto, width: 'w-[200px]' },
              { content: activity.Actividad, width: 'w-[400px]' },
              { content: activity.orden_actividad, width: 'w-[150px]' },
              { content: activity.tipo, width: 'w-[100px]' },
              { content: activity.Finalizacion, width: 'w-[100px]' }
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
