import { ICourseData } from '../../../shared/interfaces/courses.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

type PropsCoursesTemplate = {
  data: ICourseData[];
};

export default function CoursesTemplate({ data }: PropsCoursesTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ICourseData[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [category, setCategory] = useState<number>(0);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // categories filtering
    let categories = dataTable.map((a: ICourseData) => a.category);
    setCategoryOptions(categories.filter((item: number | null, index: number) => categories.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (category: number) => {
    setFilterStarted(true);
    if (category !== 0) {
      setDataTable(dataTable.filter((activity: ICourseData) => activity.category === category));
      return;
    }
  };

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
        <div className='w-[150px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(category)} customClass='shadow-lg' />
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
    </LayoutOrganism>
  );
}
