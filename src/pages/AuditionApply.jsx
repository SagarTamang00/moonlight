import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { applyAudition } from "../api/auditionApplyApi";

const AuditionApply = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
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

    // CLOSE MODAL → navigate to home
    const handleCloseModal = () => {
        setSuccessModal(false);
        navigate("/");
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
                age: "",
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
            <div className="min-h-screen bg-black text-white overflow-x-hidden">

                {/* BACKGROUND GLOW */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] bg-white/5 blur-[120px] sm:blur-[160px] lg:blur-[180px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

                    {/* TOP BAR */}
                    <div className="flex items-center justify-between mb-8 sm:mb-10 lg:mb-12">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 text-xs sm:text-sm"
                        >
                            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                            Back To Home
                        </Link>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white/35">
                            Moonlight Motion Pictures
                        </p>
                    </div>

                    {/* HEADER */}
                    <div className="mb-8 sm:mb-10 lg:mb-14">
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 mb-3 sm:mb-4">
                            Casting Call
                        </p>
                        <h1
                            className="font-bold leading-none text-white mb-4 sm:mb-6"
                            style={{
                                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                                letterSpacing: "-0.05em",
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            Audition
                            <br />
                            Application
                        </h1>
                        <p className="max-w-2xl text-white/55 leading-relaxed text-sm sm:text-base">
                            Submit your audition profile for upcoming cinematic productions.
                            Fill out the application carefully and upload the required files.
                        </p>
                    </div>

                    {/* FORM CARD */}
                    <div className="rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6 lg:p-10">
                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7 lg:space-y-8">

                            {/* GRID — stacks on mobile, 2-col on md+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">

                                {/* NAME */}
                                <div>
                                    <label className="block text-xs sm:text-sm text-white/70 mb-2 sm:mb-3">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-11 sm:h-12 lg:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-white/70 mb-2 sm:mb-3">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Enter your age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-11 sm:h-12 lg:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-all"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="block text-xs sm:text-sm text-white/70 mb-2 sm:mb-3">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-11 sm:h-12 lg:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-all"
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="block text-xs sm:text-sm text-white/70 mb-2 sm:mb-3">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-11 sm:h-12 lg:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-all"
                                    />
                                </div>

                                {/* LOCATION */}
                                <div>
                                    <label className="block text-xs sm:text-sm text-white/70 mb-2 sm:mb-3">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Your city / country"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-11 sm:h-12 lg:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-all"
                                    />
                                </div>

                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="block text-xs sm:text-sm text-white/70 mb-2 sm:mb-3">
                                    About Yourself
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Tell us about your acting experience, skills, interests, etc."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-all resize-none leading-relaxed"
                                />
                            </div>

                            {/* FILES — stacks on mobile, 3-col on md+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">

                                {/* FRONT IMAGE */}
                                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                        <Upload size={14} className="sm:w-4 sm:h-4 text-white/70" />
                                        <p className="text-xs sm:text-sm text-white">Front Image</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFrontImage(e.target.files[0])}
                                        required
                                        className="text-xs text-white/60 w-full file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:cursor-pointer file:transition-all"
                                    />
                                </div>

                                {/* SIDE IMAGE */}
                                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                        <Upload size={14} className="sm:w-4 sm:h-4 text-white/70" />
                                        <p className="text-xs sm:text-sm text-white">Side Image</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSideImage(e.target.files[0])}
                                        required
                                        className="text-xs text-white/60 w-full file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:cursor-pointer file:transition-all"
                                    />
                                </div>

                                {/* CV */}
                                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                        <Upload size={14} className="sm:w-4 sm:h-4 text-white/70" />
                                        <p className="text-xs sm:text-sm text-white">CV / Portfolio</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setCv(e.target.files[0])}
                                        required
                                        className="text-xs text-white/60 w-full file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:cursor-pointer file:transition-all"
                                    />
                                </div>

                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 sm:h-12 lg:h-14 rounded-xl sm:rounded-2xl bg-white text-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm font-semibold hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit Application"
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            {successModal && (
                <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center px-4">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 text-center">

                        <div className="flex justify-center mb-4 sm:mb-5">
                            <CheckCircle2 size={48} className="sm:w-[60px] sm:h-[60px] text-white" />
                        </div>

                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/40 mb-2 sm:mb-3">
                            Application Submitted
                        </p>

                        <h2
                            className="text-white font-bold mb-3 sm:mb-4"
                            style={{
                                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            Thank You
                        </h2>

                        <p className="text-white/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                            Your audition application has been successfully submitted.
                            Our casting team will review your profile and contact you soon.
                        </p>

                        <button
                            onClick={handleCloseModal}
                            className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl bg-white text-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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