type PropsButtonAtom = {
  content: string | JSX.Element;
  disabled?: true;
  customClass?: string;
  onClick: () => void;
};

export default function ButtonAtom({ content, disabled, customClass, onClick }: PropsButtonAtom) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || false}
      className={`${customClass || ''} px-4 py-2 bg-black text-white font-semibold rounded-lg`}>
      {content}
    </button>
  );
}
