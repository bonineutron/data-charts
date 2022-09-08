import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { backgroundColors } from '../../../shared/mocks/bar.mock';
import { Bar } from 'react-chartjs-2';

type PropsBarOrganism = {
  dataBar: number[];
  labels: string[];
  title?: string;
  customClass?: string;
};

const barGuideColors: string[] = [
  'bg-[#2980B9]',
  'bg-[#C0392B]',
  'bg-[#9B59B6]',
  'bg-[#1ABC9C]',
  'bg-[#27AE60]',
  'bg-[#F1C40F]',
  'bg-[#E67E22]',
  'bg-[#95A5A6]',
  'bg-[#34495E]',
  'bg-[#2980B9]',
  'bg-[#C0392B]',
  'bg-[#9B59B6]',
  'bg-[#1ABC9C]',
  'bg-[#27AE60]',
  'bg-[#F1C40F]',
  'bg-[#E67E22]',
  'bg-[#95A5A6]',
  'bg-[#34495E]',
  'bg-[#2980B9]',
  'bg-[#C0392B]',
  'bg-[#9B59B6]',
  'bg-[#1ABC9C]',
  'bg-[#27AE60]',
  'bg-[#F1C40F]',
  'bg-[#E67E22]',
  'bg-[#95A5A6]',
  'bg-[#34495E]'
];

export default function BarOrganism({ dataBar, labels, title, customClass }: PropsBarOrganism) {
  // settings
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  return (
    <div className={`w-full rounded-lg shadow-lg mb-4 bg-gray-100 ${customClass || ''}`}>
      {title && (
        <h2 className='w-[90%] pt-3 mx-auto font-semibold text-center text-[20px] border-b border-gray-300'>{title}</h2>
      )}
      <div className='w-fit mx-auto px-10 pt-3 flex flex-wrap gap-y-[1px] gap-x-3'>
        {labels.map((label: string, index: number) => (
          <div className='flex items-center gap-1 text-sm' key={index}>
            <span
              className={`${barGuideColors[index]} w-[30px] py-[2px] flex justify-center items-center text-white leading-none text-[12px] font-semibold rounded-sm`}>
              {dataBar[index]}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className='relative w-full px-10 py-3'>
        <Bar
          data={{
            labels: labels.map((label) =>
              typeof label === 'string' ? (label.length > 10 ? label.slice(0, 10) + '...' : label) : label
            ),
            datasets: [
              {
                data: dataBar.map((item: number) => item),
                backgroundColor: backgroundColors
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    </div>
  );
}
