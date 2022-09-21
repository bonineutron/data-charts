import { ILastAccessData } from '../../../shared/interfaces/last-access.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TotalsCard from '../../atoms/totals-card/totals-card.atom';
import TableOrganism from '../../organisms/table/table.organism';
import { useState, useEffect, useRef, useCallback } from 'react';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Input from '../../atoms/input/input.atom';
import { MdRefresh } from 'react-icons/md';
import { toPng } from 'html-to-image';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

type PropsLastAccessTemplate = {
  data: ILastAccessData[];
};

export default function LastAccessTemplate({ data }: PropsLastAccessTemplate) {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ILastAccessData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const [categoriesOptions1, setCategoriesOptions1] = useState<any>([]);
  const [categoriesOptions2, setCategoriesOptions2] = useState<any>([]);
  const [course, setCourse] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [category1, setCategory1] = useState<string>('');
  const [category2, setCategory2] = useState<string>('');

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let categories = dataTable.map((category: ILastAccessData) => category.Categoria);
    setCategoriesOptions(categories.filter((item: string | null, index: number) => categories.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((course: ILastAccessData) => course.curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // courses filtering
    let categories1 = dataTable.map((course: ILastAccessData) => course.Categoria1);
    setCategoriesOptions1(
      categories1.filter((item: string | null, index: number) => categories1.indexOf(item) === index)
    );
    // courses filtering
    let categories2 = dataTable.map((course: ILastAccessData) => course.Categoria2);
    setCategoriesOptions2(
      categories2.filter((item: string | null, index: number) => categories2.indexOf(item) === index)
    );
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (category: string, category1: string, category2: string, course: string) => {
    setFilterStarted(true);
    if (course) {
      setDataTable(dataTable.filter((access: ILastAccessData) => access.curso === course));
      return;
    }
    if (category) {
      setDataTable(dataTable.filter((access: ILastAccessData) => access.Categoria === category));
      return;
    }
    if (category1) {
      setDataTable(dataTable.filter((access: ILastAccessData) => access.Categoria1 === category1));
      return;
    }
    if (category2) {
      setDataTable(dataTable.filter((access: ILastAccessData) => access.Categoria2 === category2));
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
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
        const pdf = new jsPDF('p', 'mm', [210, 200]);
        pdf.addImage(imgData, 'PNG', 5, 5, 190, 190);
        pdf.save('download.pdf');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <LayoutOrganism title='Data Charts - Last Access' name='description' content='Last access page.'>
      <div className='flex justify-between items-end mb-4'>
        <div className='w-[800px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
            customClass='w-[170px]'
            flexCol
          />
          <Select
            value={category}
            label='Categorias:'
            setValue={setCategory}
            options={
              categoriesOptions ? categoriesOptions.map((category: any) => ({ value: category, label: category })) : []
            }
            customClass='w-[170px]'
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
            customClass='w-[170px]'
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
            customClass='w-[170px]'
            flexCol
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom
            content='Filtrar'
            onClick={() => filter(category, category1, category2, course)}
            customClass='shadow-lg'
          />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <TotalsCard title={dataTable.length} subTitle='Total de Ultimos Accesos' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Nombre', width: 'w-[250px]' },
              { content: 'Apellidos', width: 'w-[250px]' },
              { content: 'Usuario', width: 'w-[300px]' },
              { content: 'Curso', width: 'w-[400px]' },
              { content: 'Categoria', width: 'w-[200px]' },
              { content: 'Categoría 1', width: 'w-[200px]' },
              { content: 'Categoría 2', width: 'w-[200px]' },
              { content: 'Fecha', width: 'w-[200px]' },
              { content: 'Dias trancurridos(hoy)', width: 'w-[200px]' }
            ],
            bodyCells: dataTable.map((access: ILastAccessData) => [
              { content: access.Nombre, width: 'w-[250px]' },
              { content: access.Apellidos, width: 'w-[250px]' },
              { content: access.usuario, width: 'w-[300px]' },
              { content: access.curso, width: 'w-[400px]' },
              { content: access.Categoria, width: 'w-[200px]' },
              { content: access.Categoria1, width: 'w-[200px]' },
              { content: access.Categoria2, width: 'w-[200px]' },
              { content: access.fecha, width: 'w-[200px]' },
              {
                content: access.Ultimo_acceso_dias,
                width: 'w-[200px]',
                colorRow: access.Ultimo_acceso_dias && access.Ultimo_acceso_dias > 60 ? 'red' : 'green'
              }
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
