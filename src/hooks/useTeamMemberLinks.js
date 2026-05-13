import { useEffect, useState } from "react";
import { getMemberLinks } from "../api/teamLinks";

const useTeamMemberLinks = (memberId) => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLinks = () => {
        if (!memberId) return;

        setLoading(true);

        getMemberLinks(memberId)
            .then(res => setLinks(res.data.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLinks();
    }, [memberId]);

    return {
        links,
        loading,
        refetch: fetchLinks
    };
};

export default useTeamMemberLinks;