import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

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

    const [loading, setLoading] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

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

            setLoading(true);

            const data = new FormData();

            // TEXT FIELDS
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // FILES
            if (frontImage) {
                data.append("front_image", frontImage);
            }

            if (sideImage) {
                data.append("side_image", sideImage);
            }

            if (cv) {
                data.append("cv", cv);
            }

            await applyAudition(data);

            // RESET FORM
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

            // OPEN SUCCESS MODAL
            setSuccessModal(true);

        } catch (err) {

            console.log(err);

            alert("Failed to submit application");

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-black text-white overflow-hidden">

                {/* BACKGROUND GLOW */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 blur-[180px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">

                    {/* TOP BAR */}
                    <div className="flex items-center justify-between mb-12">

                        <Link
                            to="/"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-white/60
                                hover:text-white
                                transition-all
                                duration-300
                                text-sm
                            "
                        >
                            <ArrowLeft size={16} />
                            Back To Home
                        </Link>

                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                            Moonlight Motion Pictures
                        </p>

                    </div>

                    {/* HEADER */}
                    <div className="mb-14">

                        <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-4">
                            Casting Call
                        </p>

                        <h1
                            className="font-bold leading-none text-white mb-6"
                            style={{
                                fontSize: "clamp(3rem, 8vw, 6rem)",
                                letterSpacing: "-0.05em",
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            Audition
                            <br />
                            Application
                        </h1>

                        <p className="max-w-2xl text-white/55 leading-relaxed text-base">
                            Submit your audition profile for upcoming cinematic productions.
                            Fill out the application carefully and upload the required files.
                        </p>

                    </div>

                    {/* FORM CARD */}
                    <div
                        className="
                            rounded-[2rem]
                            border
                            border-white/10
                            bg-white/[0.03]
                            backdrop-blur-xl
                            p-6
                            md:p-10
                        "
                    >

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >

                            {/* GRID */}
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* NAME */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-3">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-black/40
                                            border
                                            border-white/10
                                            text-white
                                            placeholder:text-white/25
                                            outline-none
                                            focus:border-white/30
                                            transition-all
                                        "
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-3">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-black/40
                                            border
                                            border-white/10
                                            text-white
                                            placeholder:text-white/25
                                            outline-none
                                            focus:border-white/30
                                            transition-all
                                        "
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-3">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-black/40
                                            border
                                            border-white/10
                                            text-white
                                            placeholder:text-white/25
                                            outline-none
                                            focus:border-white/30
                                            transition-all
                                        "
                                    />
                                </div>

                                {/* LOCATION */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-3">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Your city / country"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-black/40
                                            border
                                            border-white/10
                                            text-white
                                            placeholder:text-white/25
                                            outline-none
                                            focus:border-white/30
                                            transition-all
                                        "
                                    />
                                </div>

                            </div>

                            {/* DESCRIPTION */}
                            <div>

                                <label className="block text-sm text-white/70 mb-3">
                                    About Yourself
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Tell us about your acting experience, skills, interests, etc."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    className="
                                        w-full
                                        px-5
                                        py-4
                                        rounded-2xl
                                        bg-black/40
                                        border
                                        border-white/10
                                        text-white
                                        placeholder:text-white/25
                                        outline-none
                                        focus:border-white/30
                                        transition-all
                                        resize-none
                                    "
                                />

                            </div>

                            {/* FILES */}
                            <div className="grid md:grid-cols-3 gap-6">

                                {/* FRONT IMAGE */}
                                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

                                    <div className="flex items-center gap-2 mb-4">
                                        <Upload size={16} />
                                        <p className="text-sm text-white">
                                            Front Image
                                        </p>
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setFrontImage(e.target.files[0])
                                        }
                                        required
                                        className="text-xs text-white/60 w-full"
                                    />

                                </div>

                                {/* SIDE IMAGE */}
                                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

                                    <div className="flex items-center gap-2 mb-4">
                                        <Upload size={16} />
                                        <p className="text-sm text-white">
                                            Side Image
                                        </p>
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setSideImage(e.target.files[0])
                                        }
                                        required
                                        className="text-xs text-white/60 w-full"
                                    />

                                </div>

                                {/* CV */}
                                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

                                    <div className="flex items-center gap-2 mb-4">
                                        <Upload size={16} />
                                        <p className="text-sm text-white">
                                            CV / Portfolio
                                        </p>
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/"
                                        onChange={(e) =>
                                            setCv(e.target.files[0])
                                        }
                                        required
                                        className="text-xs text-white/60 w-full"
                                    />

                                </div>

                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    h-14
                                    rounded-2xl
                                    bg-white
                                    text-black
                                    uppercase
                                    tracking-[0.25em]
                                    text-sm
                                    font-semibold
                                    hover:scale-[1.01]
                                    transition-all
                                    duration-300
                                    disabled:opacity-50
                                "
                            >
                                {loading
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            {successModal && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[99999]
                        bg-black/85
                        backdrop-blur-md
                        flex
                        items-center
                        justify-center
                        px-4
                    "
                >

                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-[2rem]
                            border
                            border-white/10
                            bg-[#0d0d0d]
                            p-8
                            text-center
                        "
                    >

                        <div className="flex justify-center mb-5">
                            <CheckCircle2
                                size={60}
                                className="text-white"
                            />
                        </div>

                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3">
                            Application Submitted
                        </p>

                        <h2
                            className="text-white font-bold mb-4"
                            style={{
                                fontSize: "2rem",
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            Thank You
                        </h2>

                        <p className="text-white/60 leading-relaxed mb-8">
                            Your audition application has been successfully submitted.
                            Our casting team will review your profile and contact you soon.
                        </p>

                        {/* ONLY CLOSE WITH BUTTON */}
                        <button
                            onClick={() => setSuccessModal(false)}
                            className="
                                w-full
                                h-12
                                rounded-2xl
                                bg-white
                                text-black
                                uppercase
                                tracking-[0.25em]
                                text-sm
                                font-semibold
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                            "
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default AuditionApply;