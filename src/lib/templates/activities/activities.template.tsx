import { IActivityData } from '../../../shared/interfaces/activities.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import Bar from '../../organisms/bar/bar.organism';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import { CSVLink } from 'react-csv';

type PropsActivitiesTemplate = {
  data: IActivityData[];
};

export default function ActivitiesTemplate({ data }: PropsActivitiesTemplate): JSX.Element {
  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IActivityData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [modulesOptions, setModulesOptions] = useState<any>([]);
  const [course, setCourse] = useState<number>(0);
  const [module, setModule] = useState<string>('');
  const [barValues, setBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let modules = dataTable.map((a: IActivityData) => a.modulo);
    setModulesOptions(modules.filter((item: string | null, index: number) => modules.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: IActivityData) => a.course);
    setCoursesOptions(courses.filter((item: number | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // data bar chart
    let modules = dataTable.map((category: IActivityData) => category.modulo);
    let moduleCount = modules.reduce((prev: any, curr: any) => ((prev[curr] = prev[curr] + 1 || 1), prev), {});
    let reorderCount = modulesOptions.map((category: any) => (category = moduleCount[category]));
    setBarValues(reorderCount);
  }, [modulesOptions]);

  // methods
  const filter = (module: string, course: number) => {
    setFilterStarted(true);
    if (module && course !== 0) {
      setDataTable(
        dataTable.filter((activity: IActivityData) => activity.modulo === module && activity.course === course)
      );
      return;
    }
    if (course !== 0) {
      setDataTable(dataTable.filter((activity: IActivityData) => activity.course === course));
      return;
    }
    if (module) {
      setDataTable(dataTable.filter((activity: IActivityData) => activity.modulo === module));
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse(0);
    setModule('');
  };

  return (
    <LayoutOrganism title='Data Charts - Activities' name='description' content='Activities page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[500px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
            customClass='w-[170px]'
          />
          <Select
            value={module}
            label='Modulos:'
            setValue={setModule}
            options={modulesOptions ? modulesOptions.map((module: any) => ({ value: module, label: module })) : []}
            customClass='w-[170px]'
          />
        </div>
        <div className='w-[200px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(module, course)} customClass='shadow-lg' />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <Bar dataBar={barValues} labels={modulesOptions} title='Total de Modulos' />
      <TableOrganism
        data={{
          headCells: [
            { content: 'Id', width: 'w-[80px]' },
            { content: 'Course', width: 'w-[100px]' },
            { content: 'Module', width: 'w-[100px]' },
            { content: 'Modulo', width: 'w-[100px]' },
            { content: 'Idcmodules', width: 'w-[200px]' },
            { content: 'Name', width: 'w-[400px]' }
          ],
          bodyCells: dataTable.map((activity: IActivityData) => [
            { content: activity.id, width: 'w-[80px]' },
            { content: activity.course, width: 'w-[100px]' },
            { content: activity.module, width: 'w-[100px]' },
            { content: activity.modulo, width: 'w-[100px]' },
            { content: activity.idcmodules, width: 'w-[200px]' },
            { content: activity.name, width: 'w-[400px] truncate' }
          ])
        }}
        messageNotFound={MessageNotFound}
      />
    </LayoutOrganism>
  );
}
