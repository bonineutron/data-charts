import MatriculatedBadgesTemplate from '../../lib/templates/matriculated-badges/matriculated-badges.template';
import { IMatriculatedData } from '../../shared/interfaces/matriculated-badges.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Logins(): JSX.Element {
  // states
  const [data, setData] = useState<IMatriculatedData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_insignias_matriculados'
      })
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return <MatriculatedBadgesTemplate data={data} />;
}
