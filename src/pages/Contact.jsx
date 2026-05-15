import { useState } from "react";
import { sendContactForm } from "../api/contactApi";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_number: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // SUBMIT FORM
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setSuccess(false);

        try {

            await sendContactForm(formData);

            setSuccess(true);

            setFormData({
                name: "",
                email: "",
                contact_number: "",
                subject: "",
                message: ""
            });

        } catch (err) {

            console.log(err);
            alert("Failed to send message");

        } finally {

            setLoading(false);
        }
    };


    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>

            <h2>Contact Us</h2>


            <form onSubmit={handleSubmit}>


                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
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


                {/* CONTACT NUMBER */}
                <input
                    type="text"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                />


                {/* SUBJECT */}
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />


                {/* MESSAGE */}
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />


                {/* BUTTON */}
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                </button>


                {/* SUCCESS MESSAGE */}
                {success && (
                    <p style={{ color: "green" }}>
                        Message sent successfully ✔
                    </p>
                )}


            </form>

        </div>
    );
};

export default Contact;