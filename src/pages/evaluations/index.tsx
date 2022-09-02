import EvaluationsTemplate from '../../lib/templates/evaluations/evaluations.template';
import { IEvaluations } from '../../shared/interfaces/evaluations.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Evaluations(): JSX.Element {
  // states
  const [evaluationsData, setEvaluationsData] = useState<IEvaluations[]>([]);

  // effects
  useEffect(() => {
    axios
      .post('https://data-charts-api.herokuapp.com/api/tables', {
        table: 'mdl_evaluaciones'
      })
      .then((data) => setEvaluationsData(data.data));
  }, []);

  return <EvaluationsTemplate data={evaluationsData} />;
}
