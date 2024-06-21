import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { CourseType } from "../../../services/courseService";

interface Props {
    course: CourseType[];
}

const SlideComponent = function ({ course }: Props) {

    return (
        <>
            <div className="d-flex flex-column align-items-center py-4">
                <Splide
                    options={{
                        type: "loop",
                        perPage: 4,
                        perMove: 1,
                        width: 1200,
                        pagination: false,
                        breakpoints: {
                            1200: {
                                perPage: 2,
                                width: 600,
                            },
                            600: {
                                perPage: 1,
                                width: 300,
                            },
                            600: {
                                width: 250,
                            },
                        },
                    }}
                >
                    {course?.map((course) => (
                        <SplideSlide key={course.id}>
                            <SlideCard courseContent={course} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    );
};

export default SlideComponent;
