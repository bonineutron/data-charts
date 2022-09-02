import StateCoursesTemplate from '../../lib/templates/state-courses/state-courses.template';
import { IStateCourseData } from '../../shared/interfaces/state-courses.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StateCourses(): JSX.Element {
  // states
  const [coursesData, setCoursesData] = useState<IStateCourseData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_estado_cursos'
      })
      .then((data) => setCoursesData(data.data));
  }, []);

  return <StateCoursesTemplate data={coursesData} />;
}
