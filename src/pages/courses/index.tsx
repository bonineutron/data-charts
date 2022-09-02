import CoursesTemplate from '../../lib/templates/courses/courses.template';
import { ICourseData } from '../../shared/interfaces/courses.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Courses(): JSX.Element {
  // states
  const [courseData, setCourseData] = useState<ICourseData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_course2'
      })
      .then((data) => setCourseData(data.data));
  }, []);

  return <CoursesTemplate data={courseData} />;
}
