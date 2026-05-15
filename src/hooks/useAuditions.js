import { useEffect, useState } from "react";

import { getAuditions } from "../api/auditionApi";


const useAuditions = () => {

    const [auditions, setAuditions] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchAuditions = async () => {

            try {

                const res = await getAuditions();

                setAuditions(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchAuditions();

    }, []);


    return {
        auditions,
        loading
    };
};

export default useAuditions;