import styles from "../../../../styles/colors.module.scss";
import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";

const NewestCategory = function () {
    const { data, error } = useSWR("/newest", courseService.getNewestCourses);

    if (error) return error;
    return (
        <>
            <p>Loanding...</p>
        </>
    )

    return (
        <>
            <p className={styles.titleCategory}>EM DESTAQUE</p>
            <SlideComponent course={data.data} />
        </>
    )
}

export default NewestCategory;