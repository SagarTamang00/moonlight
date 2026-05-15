import { useState } from "react";

import usePartners from "../hooks/usePartners";

import {
    createPartner,
    deletePartner
} from "../api/partnerApi";


const AdminPartners = () => {

    const { partners, loading } = usePartners();

    const [formData, setFormData] = useState({
        name: "",
        website: "",
        description: "",
        type: ""
    });

    const [logo, setLogo] = useState(null);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // CREATE PARTNER
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (logo) {
                data.append("logo", logo);
            }

            await createPartner(data);

            alert("Partner created successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to create partner");
        }
    };


    // DELETE PARTNER
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this partner?"
        );

        if (!confirmDelete) return;

        try {

            await deletePartner(id);

            alert("Partner deleted successfully");

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Failed to delete partner");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h2>Partners Admin</h2>


            {/* CREATE FORM */}
            <form onSubmit={handleSubmit}>

                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    placeholder="Partner Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                {/* WEBSITE */}
                <input
                    type="url"
                    name="website"
                    placeholder="Website URL"
                    value={formData.website}
                    onChange={handleChange}
                />


                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />


                {/* TYPE */}
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >

                    <option value="">
                        Select Type
                    </option>

                    <option value="studio">
                        Studio
                    </option>

                    <option value="sponsor">
                        Sponsor
                    </option>

                    <option value="platform">
                        Platform
                    </option>

                </select>


                {/* LOGO */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setLogo(e.target.files[0])
                    }
                />


                <button type="submit">
                    Create Partner
                </button>

            </form>


            {/* LIST */}
            <div>

                {partners.map((item) => (

                    <div key={item.id}>

                        {item.logo && (
                            <img
                                src={`http://localhost:5000${item.logo}`}
                                width="120"
                                alt="logo"
                            />
                        )}

                        <h3>{item.name}</h3>

                        <p>{item.type}</p>

                        {item.website && (
                            <a
                                href={item.website}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Visit
                            </a>
                        )}

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

export default AdminPartners;