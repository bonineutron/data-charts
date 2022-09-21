import { IStateCourseData } from '../../../shared/interfaces/state-courses.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import { useState, useEffect, useRef, useCallback } from 'react';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Bar from '../../organisms/bar/bar.organism';
import Input from '../../atoms/input/input.atom';
import { MdRefresh } from 'react-icons/md';
import { toPng } from 'html-to-image';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

type PropsStateCoursesTemplatee = {
  data: IStateCourseData[];
};

export default function StateCoursesTemplate({ data }: PropsStateCoursesTemplatee): JSX.Element {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IStateCourseData[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [category, setCategory] = useState<string>('');
  const [dateOne, setdateOne] = useState<string>('');
  const [dateTwo, setdateTwo] = useState<string>('');
  // bar states
  const [categoriesBarValues, setCategoriesBarValues] = useState<number[]>([]);

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
  useEffect(() => {
    // categories data bar chart
    let separateCategories: IStateCourseData[][] = [];
    for (let i: number = 0; i < categoryOptions.length; i++) {
      separateCategories.push(
        dataTable.filter((category: IStateCourseData) => category.Categoria === categoryOptions[i])
      );
    }
    let separateFinished = separateCategories.map((categories: IStateCourseData[]) =>
      categories.map((category: IStateCourseData) => category.Estado)
    );
    let filterFinished = separateFinished.map((completions: (string | null)[]) =>
      completions.filter((item: string | null) => item === 'Activo')
    );
    let completionCount: number[] = filterFinished.map((ending: (string | null)[]) => ending.length);
    setCategoriesBarValues(completionCount);
  }, [categoryOptions]);

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
  const generatePdf = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const imgData = dataUrl;
        const pdf = new jsPDF('p', 'mm', [210, 290]);
        pdf.addImage(imgData, 'PNG', 5, 5, 200, 280);
        pdf.save('download.pdf');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <LayoutOrganism title='Data Charts - State Courses' name='description' content='State courses page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[850px] flex justify-between'>
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
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(category, dateOne, dateTwo)} customClass='shadow-lg' />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <Bar
          dataBar={categoriesBarValues}
          labels={categoryOptions.map((category: string | null) => (category === null ? 'null' : category))}
          title='Cantidad de Cursos Activos por Categoria'
        />
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
          colorRow
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
