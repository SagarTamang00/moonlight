import { useEffect, useState } from "react";
import { getNewsBlogs } from "../api/newsBlogApi";

const useNewsBlogs = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchNews = async () => {

            try {

                const res = await getNewsBlogs();
                setNews(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {
                setLoading(false);
            }
        };

        fetchNews();

    }, []);

    return {
        news,
        loading
    };
};

export default useNewsBlogs;