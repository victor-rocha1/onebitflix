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
            <div>
                <Splide
                    options={{
                        type: "loop",
                        perPage: 4,
                        perMove: 1,
                        pagination: false,
                    }}
                >
                    {course?.map((course) => (
                        <SplideSlide key={course.id}>
                            <SlideCard course={course} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    );
};

export default SlideComponent;
