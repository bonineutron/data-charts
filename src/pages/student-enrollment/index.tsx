import StudentEnrollmentTemplate from '../../lib/templates/student-enrollment/student-enrollment.template';
import { IStudentEnrollmentData } from '../../shared/interfaces/student-enrollment.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentEnrollment(): JSX.Element {
  // states
  const [data, setData] = useState<IStudentEnrollmentData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_matriculas_estudiantes'
      })
      .then((data) => setData(data.data));
  }, []);

  return <StudentEnrollmentTemplate data={data} />;
}
