import { ICompletedCoursesData } from '../../../shared/interfaces/completed-courses.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

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
  const [course, setCourse] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let categories = dataTable.map((a: ICompletedCoursesData) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: ICompletedCoursesData) => a.idCurso);
    setCoursesOptions(courses.filter((item: number | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (category: string, course: number) => {
    setFilterStarted(true);
    if (category !== '' && course !== 0) {
      setDataTable(
        dataTable.filter(
          (activity: ICompletedCoursesData) => activity.Categoria === category && activity.idCurso === course
        )
      );
      return;
    }
    if (course !== 0) {
      setDataTable(dataTable.filter((activity: ICompletedCoursesData) => activity.idCurso === course));
      return;
    }
    if (category !== '') {
      setDataTable(dataTable.filter((activity: ICompletedCoursesData) => activity.Categoria === category));
    }
  };

  return (
    <LayoutOrganism title='Data Charts - Activities' name='description' content='Activities page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[600px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
          />
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoriesOptions ? categoriesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
          />
        </div>
        <div className='w-[150px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(category, course)} customClass='shadow-lg' />
          <ButtonAtom
            content={<MdRefresh />}
            onClick={() => {
              setDataTable([...data]);
              setFilterStarted(false);
              setMessageNotFound(false);
            }}
            customClass='shadow-lg text-[24px]'
          />
        </div>
      </div>
      <TableOrganism
        data={{
          headCells: [
            { content: 'id', width: 'w-[50px]' },
            { content: 'Usuario', width: 'w-[100px]' },
            { content: 'Nombre', width: 'w-[200px]' },
            { content: 'Apellido', width: 'w-[200px]' },
            { content: 'Email', width: 'w-[350px]' },
            { content: 'city', width: 'w-[200px]' },
            { content: 'country', width: 'w-[100px]' },
            { content: 'idCurso', width: 'w-[100px]' },
            { content: 'Curso', width: 'w-[400px]' },
            { content: 'cursocorto', width: 'w-[150px]' },
            { content: 'Categoria', width: 'w-[150px]' },
            { content: 'Categoria1', width: 'w-[150px]' },
            { content: 'tipo_curso', width: 'w-[150px]' },
            { content: 'estado', width: 'w-[100px]' },
            { content: 'Curso_Finalizado', width: 'w-[150px]' }
          ],
          bodyCells: dataTable.map((course: ICompletedCoursesData) => [
            { content: course.id, width: 'w-[50px]' },
            { content: course.Usuario, width: 'w-[100px]' },
            { content: course.Nombre, width: 'w-[200px]' },
            { content: course.Apellido, width: 'w-[200px]' },
            { content: course.Email, width: 'w-[350px]' },
            { content: course.city, width: 'w-[200px]' },
            { content: course.country, width: 'w-[100px]' },
            { content: course.idCurso, width: 'w-[100px]' },
            { content: course.Curso, width: 'w-[400px]' },
            { content: course.cursocorto, width: 'w-[150px]' },
            { content: course.Categoria, width: 'w-[150px]' },
            { content: course.Categoria1, width: 'w-[150px]' },
            { content: course.tipo_curso, width: 'w-[150px]' },
            { content: course.estado, width: 'w-[100px]' },
            { content: course.Curso_Finalizado, width: 'w-[150px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
