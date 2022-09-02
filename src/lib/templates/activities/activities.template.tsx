import { IActivityData } from '../../../shared/interfaces/activities.interface';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import TableOrganism from '../../organisms/table/table.organism';
import ButtonAtom from '../../atoms/button/button.atom';
import Select from '../../atoms/select/select.atom';
import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

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
  const [module, setModule] = useState<number>(0);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // module filtering
    let modules = dataTable.map((a: IActivityData) => a.module);
    setModulesOptions(modules.filter((item: number | null, index: number) => modules.indexOf(item) === index));
    // courses filtering
    let courses = dataTable.map((a: IActivityData) => a.course);
    setCoursesOptions(courses.filter((item: number | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);

  // methods
  const filter = (module: number, course: number) => {
    setFilterStarted(true);
    if (module !== 0 && course !== 0) {
      setDataTable(
        dataTable.filter((activity: IActivityData) => activity.module === module && activity.course === course)
      );
      return;
    }
    if (course !== 0) {
      setDataTable(dataTable.filter((activity: IActivityData) => activity.course === course));
      return;
    }
    if (module !== 0) {
      setDataTable(dataTable.filter((activity: IActivityData) => activity.course === course));
    }
  };

  return (
    <LayoutOrganism title='Data Charts - Activities' name='description' content='Activities page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[450px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
          />
          <Select
            value={module}
            label='Modulos:'
            setValue={setModule}
            options={modulesOptions ? modulesOptions.map((module: any) => ({ value: module, label: module })) : []}
          />
        </div>
        <div className='w-[150px] flex justify-between items-center'>
          <ButtonAtom content='Filtrar' onClick={() => filter(module, course)} customClass='shadow-lg' />
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
