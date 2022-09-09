import { IEvaluations } from '../../../shared/interfaces/evaluations.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Bar from '../../organisms/bar/bar.organism';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import { CSVLink } from 'react-csv';

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
    let categories = dataTable.map((a: IEvaluations) => a.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: IEvaluations) => a.Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // categories data bar chart
    let separateCategories: IEvaluations[][] = [];
    for (let i: number = 0; i < categoriesOptions.length; i++) {
      separateCategories.push(
        dataTable.filter((category: IEvaluations) => category.Categoria === categoriesOptions[i])
      );
    }
    let separateQualification = separateCategories.map((categories: IEvaluations[]) =>
      categories.map((category: IEvaluations) => {
        if (category.Nota != null) {
          return Number(category.Nota).toFixed(1);
        }
      })
    );
    let completionCount: number[] = separateQualification.map(
      (ending: (string | undefined)[]) =>
        ending &&
        Number(
          (ending.reduce((prev: number, curr: string | undefined) => prev + Number(curr), 0) / ending.length).toFixed(1)
        )
    );
    setCategoriesBarValues(completionCount);
  }, [categoriesOptions]);
  useEffect(() => {
    // courses data bar chart
    let separateCourses: IEvaluations[][] = [];
    for (let i: number = 0; i < coursesOptions.length; i++) {
      separateCourses.push(dataTable.filter((category: IEvaluations) => category.Curso === coursesOptions[i]));
    }
    let separateQualification = separateCourses.map((categories: IEvaluations[]) =>
      categories.map((category: IEvaluations) => {
        if (category.Nota != null) {
          return Number(category.Nota).toFixed(1);
        }
      })
    );
    let completionCount: number[] = separateQualification.map(
      (ending: (string | undefined)[]) =>
        ending &&
        Number(
          (ending.reduce((prev: number, curr: string | undefined) => prev + Number(curr), 0) / ending.length).toFixed(1)
        )
    );
    setCoursesBarValues(completionCount);
  }, [coursesOptions]);

  // methods
  const filter = (category: string, course: string) => {
    setFilterStarted(true);
    if (category && course) {
      setDataTable(
        dataTable.filter((activity: IEvaluations) => activity.Categoria === category && activity.Curso === course)
      );
      return;
    }
    if (course) {
      setDataTable(dataTable.filter((activity: IEvaluations) => activity.Curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((activity: IEvaluations) => activity.Categoria === category));
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
    setCategory('');
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
      <Bar dataBar={coursesBarValues} labels={coursesOptions} title='Promedio de Notas por Cursos' />
      <Bar dataBar={categoriesBarValues} labels={categoriesOptions} title='Promedio de Notas por Categorias' />
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
