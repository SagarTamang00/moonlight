import { useEffect, useState } from "react";
import API from "../utils/api";

const useSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await API.get("/settings");
                setSettings(res.data.data || null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading, error };
};

export default useSettings;