import { useEffect, useState } from "react";
import { getTeamMembers } from "../api/teamMembers";

const useTeamMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = () => {
        setLoading(true);

        getTeamMembers()
            .then(res => setMembers(res.data.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return {
        members,
        loading,
        refetch: fetchMembers
    };
};

export default useTeamMembers;