import { IStudentEnrollmentData } from '../../../shared/interfaces/student-enrollment.interface';
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

type PropsStudentEnrollmentTemplate = {
  data: IStudentEnrollmentData[];
};

export default function StudentEnrollmentTemplate({ data }: PropsStudentEnrollmentTemplate): JSX.Element {
  // settings
  const ref = useRef<HTMLDivElement>(null);

  // states
  const [MessageNotFound, setMessageNotFound] = useState<boolean>(false);
  const [filterStarted, setFilterStarted] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<IStudentEnrollmentData[]>([]);
  const [coursesOptions, setCoursesOptions] = useState<any>([]);
  const [course, setCourse] = useState<string>('');
  const [dateOne, setdateOne] = useState<string>('');
  const [dateTwo, setdateTwo] = useState<string>('');
  const [barValues, setBarValues] = useState<number[]>([]);

  // effects
  useEffect(() => {
    setDataTable([...data]);
  }, [data]);
  useEffect(() => {
    // categories filtering
    let courses = dataTable.map((a: IStudentEnrollmentData) => a.Curso);
    setCoursesOptions(courses.filter((item: string | null, index: number) => courses.indexOf(item) === index));
    // message not found
    if (!dataTable.length && filterStarted) setMessageNotFound(true);
  }, [dataTable]);
  useEffect(() => {
    // data bar chart
    let courses = dataTable.map((category: IStudentEnrollmentData) => category.Curso);
    let courseCount = courses.reduce((prev: any, curr: any) => ((prev[curr] = prev[curr] + 1 || 1), prev), {});
    let reorderCount = coursesOptions.map((category: any) => (category = courseCount[category]));
    setBarValues(reorderCount);
  }, [coursesOptions]);

  // methods
  const filter = (course: string, dateOne: string, dateTwo: string) => {
    setFilterStarted(true);
    if (course && dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (student: IStudentEnrollmentData) =>
            student.Curso === course &&
            student.Fecha_Matricula &&
            student.Fecha_Matricula.substring(0, 10) >= dateOne &&
            student.Fecha_Matricula.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (course && dateOne) {
      setDataTable(
        dataTable.filter(
          (student: IStudentEnrollmentData) =>
            student.Curso === course && student.Fecha_Matricula && student.Fecha_Matricula.substring(0, 10) == dateOne
        )
      );
      return;
    }
    if (dateOne && dateTwo) {
      setDataTable(
        dataTable.filter(
          (student: IStudentEnrollmentData) =>
            student.Fecha_Matricula &&
            student.Fecha_Matricula.substring(0, 10) >= dateOne &&
            student.Fecha_Matricula.substring(0, 10) <= dateTwo
        )
      );
      return;
    }
    if (course) {
      setDataTable(dataTable.filter((student: IStudentEnrollmentData) => student.Curso === course));
      return;
    }
    if (dateOne) {
      setDataTable(
        dataTable.filter(
          (student: IStudentEnrollmentData) =>
            student.Fecha_Matricula && student.Fecha_Matricula.substring(0, 10) == dateOne
        )
      );
      return;
    }
  };
  const resetStates = () => {
    setDataTable([...data]);
    setFilterStarted(false);
    setMessageNotFound(false);
    setCourse('');
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
    <LayoutOrganism title='Data Charts - Student Enrollment' name='description' content='Student enrollment page.'>
      <div className='flex justify-between items-center mb-4'>
        <div className='w-[850px] flex justify-between'>
          <Select
            value={course}
            label='Cursos:'
            setValue={setCourse}
            options={coursesOptions ? coursesOptions.map((course: any) => ({ value: course, label: course })) : []}
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
          <ButtonAtom content='Filtrar' onClick={() => filter(course, dateOne, dateTwo)} customClass='shadow-lg' />
          <ButtonAtom content={<MdRefresh />} onClick={() => resetStates()} customClass='shadow-lg text-[24px]' />
          <CSVLink data={dataTable} className='px-4 py-2 bg-[#1ABC9C] text-white font-semibold rounded-lg shadow-lg'>
            CSV
          </CSVLink>
        </div>
      </div>
      <div className='w-full h-full' ref={ref}>
        <Bar dataBar={barValues} labels={coursesOptions} title='Total de Matriculados por Curso' />
        <TableOrganism
          data={{
            headCells: [
              { content: 'Usuario', width: 'w-[100px]' },
              { content: 'Nombre', width: 'w-[250px]' },
              { content: 'Apellido', width: 'w-[250px]' },
              { content: 'Email', width: 'w-[300px]' },
              { content: 'Curso', width: 'w-[400px]' },
              { content: 'tipo_curso', width: 'w-[100px]' },
              { content: 'Fecha_Matricula', width: 'w-[200px]' },
              { content: 'Anio', width: 'w-[100px]' },
              { content: 'Mes', width: 'w-[100px]' },
              { content: 'Dia', width: 'w-[100px]' }
            ],
            bodyCells: dataTable.map((student: IStudentEnrollmentData) => [
              { content: student.Usuario, width: 'w-[100px]' },
              { content: student.Nombre, width: 'w-[250px]' },
              { content: student.Apellido, width: 'w-[250px]' },
              { content: student.Email, width: 'w-[300px]' },
              { content: student.Curso, width: 'w-[400px]' },
              { content: student.tipo_curso, width: 'w-[100px]' },
              { content: student.Fecha_Matricula, width: 'w-[200px]' },
              { content: student.Anio, width: 'w-[100px]' },
              { content: student.Mes, width: 'w-[100px]' },
              { content: student.Dia, width: 'w-[100px]' }
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
