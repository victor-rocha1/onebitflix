import CardsSection from '../components/homenoAuth/cardsSection';
import HeaderNoAuth from '../components/homenoAuth/headernoAuth';
import PresentationSection from '../components/homenoAuth/presentationsection';

function HomenoAuth() {
  return (
    <>
      <main>
        <div className='sectionBackground'>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardsSection />
      </main>
    </>
  );
}

export default HomenoAuth;
