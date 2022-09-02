import ActivitiesTemplate from '../../lib/templates/activities/activities.template';
import { IActivityData } from '../../shared/interfaces/activities.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Activities(): JSX.Element {
  // states
  const [data, setData] = useState<IActivityData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_actividades'
      })
      .then((data) => setData(data.data));
  }, []);

  return <ActivitiesTemplate data={data} />;
}
