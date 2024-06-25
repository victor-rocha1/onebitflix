import Head from "next/head";
import FeaturedSection from "../components/common/featuredSection";

const HomeAuth = function () {
    return (
        <>
            <Head>
                <title>Onebitflix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSection />
            </main>
        </>
    );
};

export default HomeAuth;