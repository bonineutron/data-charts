type PropsTotalsCardAtom = {
  title: number;
  subTitle: string;
  customClass?: string;
};

export default function TotalsCardAtom({ title, subTitle, customClass }: PropsTotalsCardAtom) {
  return (
    <div
      className={`w-[400px] mx-auto p-5 rounded-lg shadow-lg bg-gray-100 text-center mt-6 mb-4 ${customClass || ''}`}>
      <span className='italic font-light'>{subTitle}:</span>
      <h2 className='text-[30px] font-semibold text-primary-color'> {title}</h2>
    </div>
  );
}
