import Link from 'next/link';

export default function TopBarMolecule(): JSX.Element {
  return (
    <nav className='h-[70px] shadow-lg'>
      <ul className='h-full flex justify-center items-center gap-x-10 text-[16px] font-semibold'>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Link href='/users'>
          <a>Users</a>
        </Link>
      </ul>
    </nav>
  );
}
