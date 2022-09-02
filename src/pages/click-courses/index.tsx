import ClickCoursesTemplate from '../../lib/templates/click-courses/click-courses.template';
import { IClickDataCourses } from '../../shared/interfaces/click-courses.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClickCourses(): JSX.Element {
  // states
  const [clickCoursesData, setClickCoursesData] = useState<IClickDataCourses[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_clic_curso'
      })
      .then((data) => setClickCoursesData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return <ClickCoursesTemplate data={clickCoursesData} />;
}
