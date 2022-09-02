import UniqueLoginsTemplate from '../../lib/templates/unique-logins/unique-logins.template';
import { IUniqueLoginsData } from '../../shared/interfaces/unique-logins.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UniqueLogins(): JSX.Element {
  // states
  const [data, setData] = useState<IUniqueLoginsData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_logueos_unicos'
      })
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return <UniqueLoginsTemplate data={data} />;
}
