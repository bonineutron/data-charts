import { ICourseData } from '../../../shared/interfaces/courses.interface';
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

type PropsCoursesTemplate = {
  data: ICourseData[];
};

export default function CoursesTemplate({ data }: PropsCoursesTemplate): JSX.Element {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ICourseData[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [categoryOptions1, setCategoryOptions1] = useState<any>([]);
  const [categoryOptions2, setCategoryOptions2] = useState<any>([]);
  const [category, setCategory] = useState<string>('');
  const [category1, setCategory1] = useState<string>('');
  const [category2, setCategory2] = useState<string>('');
  const [barValues, setBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // categories filtering
    let categories = dataTable.map((category: ICourseData) => category.Categoria);
    setCategoryOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // categories filtering
    let categories1 = dataTable.map((category: ICourseData) => category.Categoria1);
    setCategoryOptions1(
      categories1.filter((item: string | null, index: number) => categories1.indexOf(item) === index)
    );
    // categories filtering
    let categories2 = dataTable.map((category: ICourseData) => category.Categoria2);
    setCategoryOptions2(
      categories2.filter((item: string | null, index: number) => categories2.indexOf(item) === index)
    );
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // data bar chart
    let categories = dataTable.map((category: ICourseData) => category.Categoria);
    let categoryCount = categories.reduce((prev: any, curr: any) => ((prev[curr] = prev[curr] + 1 || 1), prev), {});
    let reorderCount = categoryOptions.map((category: any) => (category = categoryCount[category]));
    setBarValues(reorderCount);
  }, [categoryOptions]);

  // methods
  const filter = (category: string, category1: string, category2: string) => {
    setFilterStarted(true);
    if (category) {
      setDataTable(dataTable.filter((activity: ICourseData) => activity.Categoria === category));
      return;
    }
    if (category1) {
      setDataTable(dataTable.filter((activity: ICourseData) => activity.Categoria1 === category1));
      return;
    }
    if (category2) {
      setDataTable(dataTable.filter((activity: ICourseData) => activity.Categoria2 === category2));
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCategory('');
  };
  const generatePdf = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const imgData = dataUrl;
        const pdf = new jsPDF('p', 'mm', [210, 260]);
        pdf.addImage(imgData, 'PNG', 5, 5, 200, 250);
        pdf.save('download.pdf');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <LayoutOrganism title='Data Charts - Courses' name='description' content='Courses page.'>
      <div className='flex justify-between items-end mb-4'>
        <div className='w-[600px] flex justify-between'>
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
          <Select
            value={category1}
            label='Categoría 1:'
            setValue={setCategory1}
            options={
              categoryOptions1 ? categoryOptions1.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
            flexCol
          />
          <Select
            value={category2}
            label='Categoría 2:'
            setValue={setCategory2}
            options={
              categoryOptions2 ? categoryOptions2.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
            flexCol
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom
            content='Filtrar'
            onClick={() => filter(category, category1, category2)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <Bar dataBar={barValues} labels={categoryOptions} title='Total Cursos por Categorías' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Curso', width: 'w-[400px]' },
              { content: 'Nombre Corto', width: 'w-[100px]' },
              { content: 'Categoría', width: 'w-[200px]' },
              { content: 'Categoría 1', width: 'w-[150px]' },
              { content: 'Categoría 2', width: 'w-[150px]' }
            ],
            bodyCells: dataTable.map((course: ICourseData) => [
              { content: course.Curso, width: 'w-[400px]' },
              { content: course.cursocorto, width: 'w-[100px]' },
              { content: course.Categoria, width: 'w-[200px]' },
              { content: course.Categoria1, width: 'w-[150px]' },
              { content: course.Categoria2, width: 'w-[150px]' }
            ])
          }}
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
