import { MdMenu } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TopBarMolecule(): JSX.Element {
  // settings
  const router = useRouter();
  const popUpRef = useRef<HTMLDivElement>(null);

  // states
  const [popUp, setPopUp] = useState<boolean>(false);

  // effects
  useEffect(() => {
    document.addEventListener('click', (event: MouseEvent) => {
      if (!popUpRef?.current?.contains(event.target as Node)) {
        setPopUp(false);
      }
    });
  });

  // refactor
  const aClass = (path: string): string => {
    return `${
      router.pathname === path ? 'text-primary-color' : ''
    } min-w-fit border-b-[1px] border-gray-200 hover:text-gray-400`;
  };

  return (
    <nav className='fixed w-full z-[100] h-[60px] shadow-lg bg-white'>
      <ul className='relative w-[90%] h-full mx-auto flex justify-between items-center text-[18px] font-semibold md:w-[70%] lg:w-[900px] xl:w-[1200px]'>
        <Link href='/'>
          <a className='min-w-fit'>Data Charts</a>
        </Link>
        <div ref={popUpRef}>
          <MdMenu
            onClick={() => setPopUp((isOpen) => !isOpen)}
            className='text-[30px] hover:text-gray-400 hover:cursor-pointer'
          />
        </div>
        <div
          className={`${
            !popUp && 'hidden'
          } absolute py-4 px-8 flex flex-col gap-2 right-0 top-[80px] bg-white rounded-lg shadow-lg`}>
          {/* <Link href='/activities'>
            <a className={aClass('/activities')}>Actividades</a>
          </Link> */}
          <Link href='/courses'>
            <a className={aClass('/courses')}>Listado de cursos</a>
          </Link>
          <Link href='/not-access'>
            <a className={aClass('/not-access')}>Usuarios sin acceder</a>
          </Link>
          <Link href='/last-access'>
            <a className={aClass('/last-access')}>Último acceso a cursos</a>
          </Link>
          <Link href='/completed-courses'>
            <a className={aClass('/completed-courses')}>Cursos finalizados</a>
          </Link>
          <Link href='/completed-activities'>
            <a className={aClass('/completed-activities')}>Actividades finalizadas</a>
          </Link>
          <Link href='/matriculated-badges'>
            <a className={aClass('/matriculated-badges')}>Insignias de matriculados</a>
          </Link>
          <Link href='/click-courses'>
            <a className={aClass('/click-courses')}>Clic por cursos</a>
          </Link>

          <Link href='/state-courses'>
            <a className={aClass('/state-courses')}>Estado cursos</a>
          </Link>
          <Link href='/evaluations'>
            <a className={aClass('/evaluations')}>Evaluaciones</a>
          </Link>
          {/* <Link href='/logins'>
            <a className={aClass('/logins')}>Logueos</a>
          </Link> */}
          <Link href='/unique-logins'>
            <a className={aClass('/unique-logins')}>Logueos unicos</a>
          </Link>
          {/* <Link href='/student-enrollment'>
            <a className={aClass('/student-enrollment')}>Matriculas estudiantes</a>
          </Link>
          <Link href='/online-users'>
            <a
              className={`${
                router.pathname === '/online-users' ? 'text-primary-color' : ''
              } min-w-fit hover:text-gray-400`}>
              Usuarios en línea
            </a>
          </Link> */}
        </div>
      </ul>
    </nav>
  );
}
