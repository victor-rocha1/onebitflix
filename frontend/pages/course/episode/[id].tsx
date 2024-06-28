import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import courseService, { CourseType } from "../../../src/services/courseService";
import { useRouter } from "next/router";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import { Button, Container } from "reactstrap";
import watchEpisodeService from "../../../src/services/episodeService";
import ReactPlayer from "react-player";
import PageSpinner from "../../../src/components/common/spinner";

const EpisodePlayer = function () {
    const router = useRouter();
    const episodeOrder = parseFloat(router.query.id?.toString() || "");
    const episodeId = parseFloat(router.query.episodeId?.toString() || "");
    const courseId = router.query.courseid?.toString() || "";
    const [course, setCourse] = useState<CourseType | null>(null);

    const playerRef = useRef<ReactPlayer>(null);
    const [getEpisodeTime, setGetEpisodeTime] = useState(0);
    const [episodeTime, setEpisodeTime] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(true);


    const handleGetEpisodeTime = async () => {
        const res = await watchEpisodeService.getWatchTime(episodeId);
        if (res.data !== null) {
            setGetEpisodeTime(res.data.seconds);
        }
    };

    useEffect(() => {
        handleGetEpisodeTime();
    }, [router]);

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

    const getCourse = async () => {
        if (!courseId) return;

        const res = await courseService.getEpisodes(courseId);
        if (res.status === 200) {
            setCourse(res.data);
        }
    };

    useEffect(() => {
        getCourse();
    }, [courseId]);

    useEffect(() => {
        if (!sessionStorage.getItem("onebitflix-token")) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <PageSpinner />;
    }

    const handlePlayerTime = () => {
        playerRef.current?.seekTo(getEpisodeTime);
        setIsReady(true);
    };

    useEffect(() => {
        if (course && course.episodes && episodeOrder + 1 < course.episodes.length) {
            if (Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
                handleNextEpisode();
            }
        }
    }, [episodeTime, course, episodeOrder]);



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
                    <>
                        <p className="text-center pb-4">
                            {course.episodes[episodeOrder].synopsis}
                        </p>
                        {typeof window !== "undefined" && (
                            <ReactPlayer
                                className={styles.player}
                                url={`${process.env.NEXT_PUBLIC_BASEURL
                                    }/episodes/stream?videoUrl=${course.episodes[episodeOrder].videoUrl
                                    }&token=${sessionStorage.getItem("onebitflix-token")}`}
                                controls
                                ref={playerRef}
                                onStart={handlePlayerTime}
                                onProgress={(progress) => {
                                    setEpisodeTime(progress.playedSeconds);
                                }}
                            />
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default EpisodePlayer;