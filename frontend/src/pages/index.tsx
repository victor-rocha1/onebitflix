import { GetStaticProps } from 'next';
import CardsSection from '../components/homenoAuth/cardsSection';
import HeaderNoAuth from '../components/homenoAuth/headernoAuth';
import PresentationSection from '../components/homenoAuth/presentationsection';
import SlideSection from '../components/homenoAuth/slideSection';
import courseService, { CourseType } from '../services/courseService';
import { ReactNode } from 'react';
import Footer from '../components/common/footer';

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

function HomenoAuth({ course }: IndexPageProps) {
  return (
    <>
      <main>
        <div className='sectionBackground'>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardsSection />
        <SlideSection newestCourses={course} />
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
