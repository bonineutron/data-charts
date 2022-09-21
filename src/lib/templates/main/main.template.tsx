import LayoutOrganism from '../../organisms/layout/layout.organism';
import { barGuideColors } from '../../organisms/bar/bar.organism';
import { BiRightArrowCircle } from 'react-icons/bi';
import Link from 'next/link';

export default function MainTemplate(): JSX.Element {
  return (
    <LayoutOrganism
      title='Data Charts'
      name='description'
      content='Main page this app, dashboard view. Charts of all business data.'>
      <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-11 mt-10'>
        {/* <Link href='/activities'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[0]}`}>
              <span className='text-[20px] font-semibold'>Actividades</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link> */}
        <Link href='/courses'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[1]}`}>
              <span className='text-[20px] font-semibold'>Listado de cursos</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/not-access'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[9]}`}>
              <span className='text-[20px] font-semibold'>Usuarios sin acceder</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/last-access'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[10]}`}>
              <span className='text-[20px] font-semibold'>Último acceso a cursos</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/completed-courses'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[4]}`}>
              <span className='text-[20px] font-semibold'>Cursos finalizados</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/completed-activities'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[2]}`}>
              <span className='text-[20px] font-semibold'>Actividades finalizadas</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/matriculated-badges'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[7]}`}>
              <span className='text-[20px] font-semibold'>Insignias de Matriculados</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/click-courses'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[3]}`}>
              <span className='text-[20px] font-semibold'>Clic por cursos</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>

        <Link href='/state-courses'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[5]}`}>
              <span className='text-[20px] font-semibold'>Estado cursos</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/evaluations'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[6]}`}>
              <span className='text-[20px] font-semibold'>Evaluaciones</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/logins'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[7]}`}>
              <span className='text-[20px] font-semibold'>Logueos</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/unique-logins'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[12]}`}>
              <span className='text-[20px] font-semibold'>Logueos unicos</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/student-enrollment'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[8]}`}>
              <span className='text-[20px] font-semibold'>Matriculas estudiantes</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
        <Link href='/online-users'>
          <a>
            <div
              className={`w-[200px] h-[100px] flex justify-between rounded-lg shadow-lg p-4 text-white ${barGuideColors[11]}`}>
              <span className='text-[20px] font-semibold'>Usuarios en línea</span>
              <div className='text-[40px] h-full flex items-end'>
                <BiRightArrowCircle />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </LayoutOrganism>
  );
}
