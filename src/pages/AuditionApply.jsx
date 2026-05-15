import { useState } from "react";

import { applyAudition } from "../api/auditionApplyApi";


const AuditionApply = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        description: ""
    });

    const [frontImage, setFrontImage] = useState(null);

    const [sideImage, setSideImage] = useState(null);

    const [cv, setCv] = useState(null);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // HANDLE SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            // text fields
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // files
            if (frontImage) {
                data.append(
                    "front_image",
                    frontImage
                );
            }

            if (sideImage) {
                data.append(
                    "side_image",
                    sideImage
                );
            }

            if (cv) {
                data.append(
                    "cv",
                    cv
                );
            }

            await applyAudition(data);

            alert("Application submitted successfully");


            // reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                location: "",
                description: ""
            });

            setFrontImage(null);
            setSideImage(null);
            setCv(null);

        } catch (err) {

            console.log(err);

            alert("Failed to submit application");
        }
    };


    return (
        <div>

            <h2>Apply For Audition</h2>

            <form onSubmit={handleSubmit}>


                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                {/* PHONE */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />


                {/* LOCATION */}
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />


                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    placeholder="Tell us about yourself"
                    value={formData.description}
                    onChange={handleChange}
                />


                {/* FRONT IMAGE */}
                <div>

                    <label>
                        Front Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFrontImage(
                                e.target.files[0]
                            )
                        }
                        required
                    />

                </div>


                {/* SIDE IMAGE */}
                <div>

                    <label>
                        Side Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setSideImage(
                                e.target.files[0]
                            )
                        }
                        required
                    />

                </div>


                {/* CV */}
                <div>

                    <label>
                        CV / Portfolio (PDF)
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setCv(
                                e.target.files[0]
                            )
                        }
                        required
                    />

                </div>


                <button type="submit">
                    Submit Application
                </button>

            </form>

        </div>
    );
};

export default AuditionApply;