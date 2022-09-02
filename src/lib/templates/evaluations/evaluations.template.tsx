import { IEvaluations } from '../../../shared/interfaces/evaluations.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsEvaluationsTemplate = {
  data: IEvaluations[];
};

export default function EvaluationsTemplate({ data }: PropsEvaluationsTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IEvaluations[]>([]);
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
    let categories = dataTable.map((a: IEvaluations) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: IEvaluations) => a.idCurso);
    setCoursesOptions(courses.filter((item: number | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (category: string, course: number) => {
    setFilterStarted(true);
    if (category !== '' && course !== 0) {
      setDataTable(
        dataTable.filter((activity: IEvaluations) => activity.Categoria === category && activity.idCurso === course)
      );
      return;
    }
    if (course !== 0) {
      setDataTable(dataTable.filter((activity: IEvaluations) => activity.idCurso === course));
      return;
    }
    if (category !== '') {
      setDataTable(dataTable.filter((activity: IEvaluations) => activity.Categoria === category));
    }
  };

  return (
    <LayoutOrganism title='Data Charts - Evaluations' name='description' content='Evaluations page.'>
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
            { content: 'id', width: 'w-[80px]' },
            { content: 'Usuario', width: 'w-[110px]' },
            { content: 'Nombre', width: 'w-[200px]' },
            { content: 'Apellido', width: 'w-[200px]' },
            { content: 'Email', width: 'w-[350px]' },
            { content: 'city', width: 'w-[200px]' },
            { content: 'country', width: 'w-[100px]' },
            { content: 'theme', width: 'w-[100px]' },
            { content: 'idCurso', width: 'w-[100px]' },
            { content: 'idmodules', width: 'w-[100px]' },
            { content: 'idseccion', width: 'w-[100px]' },
            { content: 'seccion', width: 'w-[100px]' },
            { content: 'Curso', width: 'w-[400px]' },
            { content: 'cursocorto', width: 'w-[110px]' },
            { content: 'Categoria', width: 'w-[200px]' },
            { content: 'Categoria1', width: 'w-[150px]' },
            { content: 'Evaluacion', width: 'w-[400px]' },
            { content: 'Nota', width: 'w-[100px]' },
            { content: 'Objetivo', width: 'w-[100px]' },
            { content: 'Porcentaje', width: 'w-[150px]' },
            { content: 'tipo_curso', width: 'w-[150px]' }
          ],
          bodyCells: dataTable.map((evaluation: IEvaluations) => [
            { content: evaluation.id, width: 'w-[80px]' },
            { content: evaluation.Usuario, width: 'w-[110px]' },
            { content: evaluation.Nombre, width: 'w-[200px]' },
            { content: evaluation.Apellido, width: 'w-[200px]' },
            { content: evaluation.Email, width: 'w-[350px]' },
            { content: evaluation.city, width: 'w-[200px]' },
            { content: evaluation.country, width: 'w-[100px]' },
            { content: evaluation.theme, width: 'w-[100px]' },
            { content: evaluation.idCurso, width: 'w-[100px]' },
            { content: evaluation.idmodules, width: 'w-[100px]' },
            { content: evaluation.idseccion, width: 'w-[100px]' },
            { content: evaluation.seccion, width: 'w-[100px]' },
            { content: evaluation.Curso, width: 'w-[400px]' },
            { content: evaluation.cursocorto, width: 'w-[110px]' },
            { content: evaluation.Categoria, width: 'w-[200px]' },
            { content: evaluation.Categoria1, width: 'w-[150px]' },
            { content: evaluation.Evaluacion, width: 'w-[400px]' },
            { content: evaluation.Nota, width: 'w-[100px]' },
            { content: evaluation.Objetivo, width: 'w-[100px]' },
            { content: evaluation.Porcentaje, width: 'w-[150px]' },
            { content: evaluation.tipo_curso, width: 'w-[150px]' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
