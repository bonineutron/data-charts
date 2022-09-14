type PropsInputAtom = {
  value: string | number;
  type: string;
  label?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  placeHolder?: string;
  customClass?: string;
  flexCol?: boolean;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};

export default function InputAtom({
  value,
  type,
  label,
  min,
  max,
  disabled,
  placeHolder,
  customClass,
  flexCol,
  setValue
}: PropsInputAtom) {
  return (
    <div className={`flex gap-2 ${flexCol ? 'flex-col' : 'items-center'}`}>
      {label && <label className='font-semibold'>{label}</label>}
      <input
        disabled={disabled || false}
        type={type}
        value={value}
        min={min || ''}
        max={max || ''}
        placeholder={placeHolder || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          typeof value === 'number' ? setValue(Number(e.target.value)) : setValue(e.target.value)
        }
        className={`${customClass} bg-white shadow-lg px-4 py-2 rounded-lg outline-none`}></input>
    </div>
  );
}
