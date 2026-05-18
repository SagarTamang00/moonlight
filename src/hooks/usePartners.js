import { useEffect, useState } from "react";
import { getPartners } from "../api/partnerApi";

const usePartners = () => {

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH FUNCTION
    const fetchPartners = async () => {

        try {

            setLoading(true);

            const res = await getPartners();

            setPartners(res.data.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    // INITIAL FETCH
    useEffect(() => {

        fetchPartners();

    }, []);

    return {
        partners,
        loading,
        refetchPartners: fetchPartners
    };
};

export default usePartners;