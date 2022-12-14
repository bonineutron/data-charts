import TopBarMolecule from '../../molecules/top-bar/top-bar.molecule';
import FooterMolecule from '../../molecules/footer/footer.molecule';
import Head from 'next/head';

type PropsLayoutOrganism = {
  title: string;
  name: string;
  content: string;
  children: React.ReactNode;
};

export default function LayoutOrganism({ title, name, content, children }: PropsLayoutOrganism): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={name} content={content} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <TopBarMolecule />
      <main className='min-h-screen w-[90%] mx-auto pt-[90px] pb-[30px] md:w-[70%] lg:w-[900px] xl:w-[1200px]'>
        {children}
      </main>
      {/* <FooterMolecule /> */}
    </>
  );
}
