import { useEffect, useState } from "react";
import { getPartners } from "../api/partnerApi";

const usePartners = () => {

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPartners = async () => {

            try {

                const res = await getPartners();
                setPartners(res.data.data);

            } catch (err) {

                console.log(err);

            } finally {
                setLoading(false);
            }
        };

        fetchPartners();

    }, []);

    return {
        partners,
        loading
    };
};

export default usePartners;