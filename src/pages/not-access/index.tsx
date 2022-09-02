import NotAccessTemplate from '../../lib/templates/not-access/not-access.template';
import { INotAccessData } from '../../shared/interfaces/not-access.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotAccess(): JSX.Element {
  // states
  const [data, setData] = useState<INotAccessData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_noacceden'
      })
      .then((data) => setData(data.data));
  }, []);

  return <NotAccessTemplate data={data} />;
}
