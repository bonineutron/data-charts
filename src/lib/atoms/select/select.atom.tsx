import { ISelect } from '../../../shared/interfaces/select.interface';
import styles from './select.module.scss';

type PropsSelectAtom = {
  options: ISelect[];
  value: string | number;
  label?: string;
  placeHolder?: string;
  customClass?: string;
  flexCol?: boolean;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};

export default function SelectAtom({
  options,
  value,
  label,
  customClass,
  flexCol,
  placeHolder,
  setValue
}: PropsSelectAtom) {
  return (
    <div className={`flex gap-2 ${flexCol ? 'flex-col' : 'items-center'}`}>
      {label && <label className='font-semibold'>{label}</label>}
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          typeof value === 'number' ? setValue(Number(e.target.value)) : setValue(e.target.value)
        }
        className={`${customClass} ${styles.select} bg-white shadow-lg px-4 py-2 rounded-lg`}>
        <option label={placeHolder || 'Seleccione'} hidden value={undefined} />
        {options.map((option: ISelect, index: number) => (
          <option className='font-normal' key={index} label={String(option.label)} value={option.value} />
        ))}
      </select>
    </div>
  );
}
