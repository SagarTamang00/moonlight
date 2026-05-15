import { useState } from "react";

import useAuditions from "../hooks/useAuditions";

import {
    createAudition,
    updateAuditionStatus,
    deleteAudition
} from "../api/auditionApi";


const AdminAuditions = () => {

    const { auditions, loading } = useAuditions();

    const [poster, setPoster] = useState(null);

    const [status, setStatus] = useState("open");


    // HANDLE FILE
    const handleFileChange = (e) => {

        setPoster(e.target.files[0]);
    };


    // CREATE AUDITION
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append(
                "audition_poster",
                poster
            );

            formData.append(
                "status",
                status
            );

            await createAudition(formData);

            alert("Audition created successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to create audition");
        }
    };


    // UPDATE STATUS
    const handleStatusChange = async (id, newStatus) => {

        try {

            await updateAuditionStatus(id, {
                status: newStatus
            });

            alert("Status updated");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to update status");
        }
    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this audition?"
        );

        if (!confirmDelete) return;

        try {

            await deleteAudition(id);

            alert("Audition deleted");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete audition");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h2>Auditions Admin</h2>


            {/* CREATE FORM */}
            <form onSubmit={handleSubmit}>

                {/* POSTER */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />


                {/* STATUS */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="open">
                        Open
                    </option>

                    <option value="closed">
                        Closed
                    </option>

                </select>


                <button type="submit">
                    Create Audition
                </button>

            </form>


            {/* AUDITIONS LIST */}
            <div>

                {auditions.map((item) => (

                    <div key={item.id}>

                        <img
                            src={`http://localhost:5000${item.audition_poster}`}
                            alt="Audition Poster"
                            width="150"
                        />

                        <p>
                            Status: {item.status}
                        </p>


                        {/* UPDATE STATUS */}
                        <select
                            value={item.status}
                            onChange={(e) =>
                                handleStatusChange(
                                    item.id,
                                    e.target.value
                                )
                            }
                        >

                            <option value="open">
                                Open
                            </option>

                            <option value="closed">
                                Closed
                            </option>

                        </select>


                        {/* DELETE */}
                        <button
                            onClick={() =>
                                handleDelete(item.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default AdminAuditions;