import LayoutOrganism from '../../organisms/layout/layout.organism';

export default function MainTemplate(): JSX.Element {
  return (
    <LayoutOrganism
      title='Data Charts'
      name='description'
      content='Main page this app, dashboard view. Charts of all business data.'>
      <div className='bg-red-200 h-full'></div>
    </LayoutOrganism>
  );
}
