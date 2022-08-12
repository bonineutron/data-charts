import Image from 'next/image';

export default function FooterMolecule(): JSX.Element {
  return (
    <footer className='h-[70px] flex justify-center items-center shadow-invert-lg'>
      <a
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-x-4'>
        <span>Powered by</span>
        <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
      </a>
    </footer>
  );
}
