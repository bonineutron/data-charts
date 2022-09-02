import { ICompletedActivitiesData } from '../../../shared/interfaces/completed-activities.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsCompletedActivitiesTemplate = {
  data: ICompletedActivitiesData[];
};

export default function CompletedActivitiesTemplate({ data }: PropsCompletedActivitiesTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ICompletedActivitiesData[]>([]);
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
    let categories = dataTable.map((a: ICompletedActivitiesData) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: ICompletedActivitiesData) => a.idCurso);
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
          (activity: ICompletedActivitiesData) => activity.Categoria === category && activity.idCurso === course
        )
      );
      return;
    }
    if (course !== 0) {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.idCurso === course));
      return;
    }
    if (category !== '') {
      setDataTable(dataTable.filter((activity: ICompletedActivitiesData) => activity.Categoria === category));
    }
  };

  return (
    <LayoutOrganism title='Data Charts - Completed Activities' name='description' content='Completed activities page.'>
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
    </LayoutOrganism>
  );
}
