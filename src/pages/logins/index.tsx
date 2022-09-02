import LoginsTemplate from '../../lib/templates/logins/logins.template';
import { ILoginsData } from '../../shared/interfaces/logins.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Logins(): JSX.Element {
  // states
  const [data, setData] = useState<ILoginsData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_logueos'
      })
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return <LoginsTemplate data={data} />;
}
