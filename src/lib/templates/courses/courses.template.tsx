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
  const [category, setCategory] = useState<number>(0);
  const [barValues, setBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // categories filtering
    let categories = dataTable.map((category: ICourseData) => category.category);
    setCategoryOptions(categories.filter((item: number | null, index: number) => categories.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // data bar chart
    let categories = dataTable.map((category: ICourseData) => category.category);
    let categoryCount = categories.reduce((prev: any, curr: any) => ((prev[curr] = prev[curr] + 1 || 1), prev), {});
    let reorderCount = categoryOptions.map((category: any) => (category = categoryCount[category]));
    setBarValues(reorderCount);
  }, [categoryOptions]);

  // methods
  const filter = (category: number) => {
    setFilterStarted(true);
    if (category !== 0) {
      setDataTable(dataTable.filter((activity: ICourseData) => activity.category === category));
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCategory(0);
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
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[300px] flex justify-between'>
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoryOptions ? categoryOptions.map((category: any) => ({ value: category, label: category })) : []
            }
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(category)} customClass='shadow-lg' />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <Bar dataBar={barValues} labels={categoryOptions} title='Total de Categorias' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Id', width: 'w-[100px]' },
              { content: 'category', width: 'w-[100px]' },
              { content: 'fullname', width: 'w-[400px]' },
              { content: 'shortname', width: 'w-[150px]' },
              { content: 'idnumber', width: 'w-[150px]' },
              { content: 'visible', width: 'w-[100px]' },
              { content: 'enable completion', width: 'w-[200px]' },
              { content: 'tipo_curso', width: 'w-[150px]' },
              { content: 'value', width: 'w-[100px]' }
            ],
            bodyCells: dataTable.map((course: ICourseData) => [
              { content: course.id, width: 'w-[100px]' },
              { content: course.category, width: 'w-[100px]' },
              { content: course.fullname, width: 'w-[400px]' },
              { content: course.shortname, width: 'w-[150px]' },
              { content: course.idnumber, width: 'w-[150px]' },
              { content: course.visible, width: 'w-[100px]' },
              { content: course.enablecompletion, width: 'w-[200px]' },
              { content: course.tipo_curso, width: 'w-[150px]' },
              { content: course.value, width: 'w-[100px]' }
            ])
          }}
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
