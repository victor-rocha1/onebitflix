import { useEffect, useState } from "react";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import courseService, { CourseType } from "../../../src/services/courseService";
import { useRouter } from "next/router";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import { Button, Container } from "reactstrap";

const EpisodePlayer = function () {
    const router = useRouter();
    const episodeOrder = parseFloat(router.query.id?.toString() || "");
    const courseId = router.query.courseid?.toString() || "";
    const [course, setCourse] = useState<CourseType | null>(null);

    const handleLastEpisode = () => {
        if (course) {
            router.push(`/courses/episode/${episodeOrder - 1}?courseid=${course.id}`);
        }
    };

    const handleNextEpisode = () => {
        if (course) {
            router.push(`/courses/episode/${episodeOrder + 1}?courseid=${course.id}`);
        }
    };

    const getCourse = async function () {
        if (typeof courseId !== "string") return;

        const res = await courseService.getEpisodes(courseId);
        if (res.status === 200) {
            setCourse(res.data);
        }
    };

    useEffect(() => {
        getCourse();
    }, [courseId]);

    return (
        <>
            <Head>
                <title>Onebitflix - {"episodeTitle"}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric logoUrl="/home" btnContent={`Voltar para o curso`} btnUrl={`/courses/${courseId}`} />
                <Container className="d-flex flex-column align-items-center gap-3 pt-3">
                    <p className={styles.episodeTitle}>
                        {episodeOrder}
                    </p>
                </Container>
                <div className={styles.episodeButton}>
                    <Button
                        className={styles.episodeButton}
                        disabled={episodeOrder === 0}
                        onClick={handleLastEpisode}
                    >
                        <img
                            src="/episode/iconArrowLeft.svg"
                            alt="setaEsquerda"
                            className={styles.arrowImg}
                        />
                    </Button>
                    <Button
                        className={styles.episodeButton}
                        onClick={handleNextEpisode}
                    >
                        <img
                            src="/episode/iconArrowRight.svg"
                            alt="setaDireita"
                            className={styles.arrowImg}
                        />
                    </Button>
                </div>
                {course && course.episodes && course.episodes[episodeOrder] && (
                    <p className="text-center pb-4">
                        {course.episodes[episodeOrder].synopsis}
                    </p>
                )}
            </main>
        </>
    );
};

export default EpisodePlayer;
