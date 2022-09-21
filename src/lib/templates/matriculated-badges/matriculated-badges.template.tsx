import { IMatriculatedData } from '../../../shared/interfaces/matriculated-badges.interface';
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
  data: IMatriculatedData[];
};

export default function MatriculatedBadgesTemplate({ data }: PropsCoursesTemplate): JSX.Element {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IMatriculatedData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [categoryOptions1, setCategoryOptions1] = useState<any>([]);
  const [categoryOptions2, setCategoryOptions2] = useState<any>([]);
  const [course, setCourse] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [category1, setCategory1] = useState<string>('');
  const [category2, setCategory2] = useState<string>('');
  const [barValues, setBarValues] = useState<number[]>([]);
  // bar states
  const [totalBadges, setTotalBadges] = useState<number>(0);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // courses filtering
    let courses = dataTable.map((category: IMatriculatedData) => category.Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // categories filtering
    let categories = dataTable.map((category: IMatriculatedData) => category.Categoria);
    setCategoryOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // categories 1 filtering
    let categories1 = dataTable.map((category: IMatriculatedData) => category.Categoria1);
    setCategoryOptions1(
      categories1.filter((item: string | null, index: number) => categories1.indexOf(item) === index)
    );
    // categories 1 filtering
    let categories2 = dataTable.map((category: IMatriculatedData) => category.Categoria2);
    setCategoryOptions2(
      categories2.filter((item: string | null, index: number) => categories2.indexOf(item) === index)
    );
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // data bar chart
    let categories = dataTable.map((category: IMatriculatedData) => category.Categoria);
    let categoryCount = categories.reduce((prev: any, curr: any) => ((prev[curr] = prev[curr] + 1 || 1), prev), {});
    let reorderCount = categoryOptions.map((category: any) => (category = categoryCount[category]));
    setBarValues(reorderCount);
  }, [categoryOptions]);
  useEffect(() => {
    // categories data bar chart
    let separateCategories: IMatriculatedData[][] = [];
    for (let i: number = 0; i < categoryOptions.length; i++) {
      separateCategories.push(
        dataTable.filter((category: IMatriculatedData) => category.Categoria === categoryOptions[i])
      );
    }
    let separateFinished = separateCategories.map((categories: IMatriculatedData[]) =>
      categories.map((category: IMatriculatedData) => category.otorgada)
    );
    let filterFinished = separateFinished.map((completions: (number | null)[]) =>
      completions.filter((item: number | null) => item === 1)
    );
    let completionCount: number[] = filterFinished.map((ending: (number | null)[]) => ending.length);
    setTotalBadges(completionCount.reduce((prev: number, curr: number | undefined) => prev + Number(curr), 0));
  }, [categoryOptions]);

  // methods
  const filter = (course: string, category: string, category1: string, category2: string) => {
    setFilterStarted(true);
    if (course) {
      setDataTable(dataTable.filter((activity: IMatriculatedData) => activity.Curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((activity: IMatriculatedData) => activity.Categoria === category));
      return;
    }
    if (category1) {
      setDataTable(dataTable.filter((activity: IMatriculatedData) => activity.Categoria1 === category1));
      return;
    }
    if (category2) {
      setDataTable(dataTable.filter((activity: IMatriculatedData) => activity.Categoria2 === category2));
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCategory('');
    setCategory1('');
    setCategory2('');
    setCourse('');
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
    <LayoutOrganism
      title='Data Charts - Insignias de Matriculados'
      name='description'
      content='matriculated badges page this app.'>
      <div className='flex justify-between items-end mb-4'>
        <div className='w-[800px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={
              coursesOptions ? coursesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
            flexCol
          />
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
            onClick={() => filter(course, category, category1, category2)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <div className='flex justify-between mb-4'>
          <div className='p-4 bg-gray-100 rounded-lg shadow-lg text-center'>
            <h3 className='italic text-gray-700'>Total de Insignias:</h3>
            <span className='font-semibold text-[18px]'> {dataTable.length}</span>
          </div>
          <div className='p-4 bg-gray-100 rounded-lg shadow-lg text-center'>
            <h3 className='italic text-gray-700'>Insignias Otorgadas:</h3>
            <span className='font-semibold text-[18px]'>{totalBadges}</span>
          </div>
          <div className='p-4 bg-gray-100 rounded-lg shadow-lg text-center'>
            <h3 className='italic text-gray-700'>Porcetaje de Insignias Otorgadas:</h3>
            <span className='font-semibold text-[18px]'> {((totalBadges / dataTable.length) * 100).toFixed(2)}%</span>
          </div>
        </div>
        <Bar dataBar={barValues} labels={categoryOptions} title='Total Cursos por Categorías' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Usuario', width: 'w-[120px]' },
              { content: 'Nombre', width: 'w-[200px]' },
              { content: 'Apellido', width: 'w-[200px]' },
              { content: 'Email', width: 'w-[300px]' },
              { content: 'Categoría', width: 'w-[150px]' },
              { content: 'Categoría 1', width: 'w-[150px]' },
              { content: 'Categoría 2', width: 'w-[150px]' },
              { content: 'Curso', width: 'w-[400px]' },
              { content: 'Nombre Insignia', width: 'w-[200px]' },
              { content: 'Puntaje Insignia', width: 'w-[150px]' },
              { content: 'Contexto', width: 'w-[100px]' },
              { content: 'Otorgada', width: 'w-[100px]' },
              { content: 'Puntos otorgados', width: 'w-[150px]' }
            ],
            bodyCells: dataTable.map((course: IMatriculatedData) => [
              { content: course.Usuario, width: 'w-[120px]' },
              { content: course.Nombre, width: 'w-[200px]' },
              { content: course.Apellido, width: 'w-[200px]' },
              { content: course.Email, width: 'w-[300px]' },
              { content: course.Categoria, width: 'w-[150px]' },
              { content: course.Categoria1, width: 'w-[150px]' },
              { content: course.Categoria2, width: 'w-[150px]' },
              { content: course.Curso, width: 'w-[400px]' },
              { content: course.Nombre_insignia, width: 'w-[200px]' },
              { content: course.badgescore, width: 'w-[150px]' },
              { content: course.context, width: 'w-[100px]' },
              { content: course.otorgada, width: 'w-[100px]', colorRow: course.otorgada === 1 ? 'green' : 'red' },
              { content: course.puntos_otorgada, width: 'w-[150px]' }
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
