import CompletedActivitiesTemplate from '../../lib/templates/completed-activities/completed-activities.template';
import { ICompletedActivitiesData } from '../../shared/interfaces/completed-activities.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CompletedActivities(): JSX.Element {
  // states
  const [activityData, setActivityData] = useState<ICompletedActivitiesData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_actividades_finalizadas'
      })
      .then((data) => setActivityData(data.data));
  }, []);

  return <CompletedActivitiesTemplate data={activityData} />;
}
