import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { userDataMock } from '../../../shared/mocks/data-users.mock';
import LayoutOrganism from '../../organisms/layout/layout.organism';
import { IUserData } from '../../../shared/interfaces/users.interface';
import { Doughnut, PolarArea, Pie } from 'react-chartjs-2';

export default function MainTemplate(): JSX.Element {
  // settings
  ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

  // refactor
  const doughnutLabels: string[] = ['Artisan', 'Bars and Restaurants', 'Beauty Professionals'];
  const doughnutBorderColor: string[] = ['#FFF', '#FFF', '#FFF'];
  const doughnutBackgroundColor: string[] = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)'
  ];
  const artisanFilter: IUserData[] = userDataMock.filter(
    (user: IUserData) => user.classification_id === 1
  );
  const beautyProfessionalsFilter: IUserData[] = userDataMock.filter(
    (user: IUserData) => user.classification_id === 2
  );
  const BarsRestaurantsFilter: IUserData[] = userDataMock.filter(
    (user: IUserData) => user.classification_id === 1
  );

  return (
    <LayoutOrganism
      title='Data Charts'
      name='description'
      content='Main page this app, dashboard view. Charts of all business data.'>
      <div className='w-full flex flex-col flex-wrap items-center justify-between gap-10 lg:flex-row'>
        <div className='w-[300px] py-4 rounded-lg shadow-lg'>
          <PolarArea
            data={{
              labels: doughnutLabels,
              datasets: [
                {
                  label: 'user classification',
                  data: [
                    artisanFilter.length,
                    BarsRestaurantsFilter.length,
                    beautyProfessionalsFilter.length
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                  ],
                  borderWidth: 0
                }
              ]
            }}
          />
        </div>
        <div className='w-[300px] py-4 rounded-lg shadow-lg'>
          <Doughnut
            data={{
              labels: doughnutLabels,
              datasets: [
                {
                  label: 'user classification',
                  data: [
                    artisanFilter.length,
                    BarsRestaurantsFilter.length,
                    beautyProfessionalsFilter.length
                  ],
                  backgroundColor: doughnutBackgroundColor,
                  borderColor: doughnutBorderColor,
                  borderWidth: 4
                }
              ]
            }}
          />
        </div>
        <div className='w-[300px] py-4 rounded-lg shadow-lg'>
          <Pie
            data={{
              labels: doughnutLabels,
              datasets: [
                {
                  label: 'user classification',
                  data: [
                    artisanFilter.length,
                    BarsRestaurantsFilter.length,
                    beautyProfessionalsFilter.length
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                  ],
                  borderWidth: 0
                }
              ]
            }}
          />
        </div>
      </div>
    </LayoutOrganism>
  );
}
