import Head from "next/head";
import FeaturedSection from "../src/components/homeAuth/featuredSection";
import NewestCategory from "../src/components/homeAuth/newestCategory";
import FavoritesCourses from "../src/components/homeAuth/favoriteCategory";
import FeaturedCategory from "../src/components/homeAuth/featuredCategory";

const HomeAuth = function () {
    return (
        <>
            <Head>
                <title>Onebitflix - Home</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <FeaturedSection />
                <NewestCategory />
                <FavoritesCourses />
                <FeaturedCategory />
            </main>
        </>
    );
};

export default HomeAuth;