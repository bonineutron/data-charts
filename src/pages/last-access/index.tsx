import LastAccessTemplate from '../../lib/templates/last-access/last-access.template';
import { ILastAccessData } from '../../shared/interfaces/last-access.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LastAccess(): JSX.Element {
  // states
  const [data, setData] = useState<ILastAccessData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_ultimo_acceso'
      })
      .then((data) => setData(data.data));
  }, []);

  return <LastAccessTemplate data={data} />;
}
