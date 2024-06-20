import HeaderNoAuth from '../components/headernoAuth';
import PresentationSection from '../components/presentationsection';

function HomenoAuth() {
  return (
    <>
      <main>
        <div className='sectionBackground'>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
      </main>
    </>
  );
}

export default HomenoAuth;
