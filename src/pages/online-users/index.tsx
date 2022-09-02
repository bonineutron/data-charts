import OnlineUsersTemplate from '../../lib/templates/online-users/online-users.template';
import { IUserData } from '../../shared/interfaces/online-users.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OnlineUsers(): JSX.Element {
  // states
  const [data, setData] = useState<IUserData[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_usuarios_online'
      })
      .then((data) => setData(data.data));
  }, []);

  return <OnlineUsersTemplate data={data} />;
}
