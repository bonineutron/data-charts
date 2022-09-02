import CompletedCoursesTemplate from '../../lib/templates/completed-courses/completed-courses.template';
import { ICompletedCoursesData } from '../../shared/interfaces/completed-courses.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CompletedCourses(): JSX.Element {
  // states
  const [courseData, setCourseData] = useState<ICompletedCoursesData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_cursos_finalizados'
      })
      .then((data) => setCourseData(data.data));
  }, []);

  return <CompletedCoursesTemplate data={courseData} />;
}
