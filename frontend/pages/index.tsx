import { GetStaticProps } from 'next';
import CardsSection from '../src/components/homenoAuth/cardsSection';
import HeaderNoAuth from '../src/components/homenoAuth/headernoAuth';
import PresentationSection from '../src/components/homenoAuth/presentationsection';
import SlideSection from '../src/components/homenoAuth/slideSection';
import courseService, { CourseType } from '../src/services/courseService';
import { ReactNode, useEffect } from 'react';
import Footer from '../src/components/common/footer';
import AOS from 'aos';
import "aos/dist/aos.css";

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

function HomenoAuth({ course }: IndexPageProps) {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <main>
        <div className='sectionBackground' data-aos="fade-zoom-in" data-aos-duration="1600">
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourses={course} />
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};

export default HomenoAuth;
