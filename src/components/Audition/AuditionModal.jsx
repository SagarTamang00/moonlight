import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import useAuditions from "../../hooks/useAuditions";

const AuditionModal = () => {

    const { auditions, loading } = useAuditions();

    const [open, setOpen] = useState(false);

    // FIND ACTIVE AUDITION
    const activeAudition = auditions.find(
        (item) => item.status === "open"
    );

    // OPEN MODAL ON WEBSITE LOAD
    useEffect(() => {

        if (!loading && activeAudition) {
            setOpen(true);
        }

    }, [loading, activeAudition]);

    // COMPLETELY DISABLE WEBSITE SCROLL
    useEffect(() => {

        if (open) {

            // BODY
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
            document.body.style.height = "100vh";

            // HTML
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.touchAction = "none";

        } else {

            // RESET BODY
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
            document.body.style.height = "auto";

            // RESET HTML
            document.documentElement.style.overflow = "auto";
            document.documentElement.style.touchAction = "auto";
        }

        return () => {

            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
            document.body.style.height = "auto";

            document.documentElement.style.overflow = "auto";
            document.documentElement.style.touchAction = "auto";
        };

    }, [open]);

    // CLOSE MODAL
    const handleClose = () => {
        setOpen(false);
    };

    // NO ACTIVE AUDITION
    if (loading || !activeAudition) {
        return null;
    }

    return (
        <>
            {/* OPEN BUTTON */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[999]
                        h-10
                        px-5
                        rounded-full
                        bg-white
                        text-black
                        text-[10px]
                        uppercase
                        tracking-[0.28em]
                        font-medium
                        hover:scale-105
                        transition-all
                        duration-300
                        shadow-2xl
                    "
                >
                    Open Audition
                </button>
            )}

            {/* MODAL */}
            {open && (

                <div
                    className="
                        fixed
                        inset-0
                        z-[99999]
                        flex
                        items-center
                        justify-center
                        bg-black/85
                        backdrop-blur-md
                        px-4
                        py-6
                        overflow-hidden
                        overscroll-none
                        touch-none
                    "
                >

                    {/* CARD */}
                    <div
                        className="
                            relative
                            w-full
                            max-w-md
                            rounded-3xl
                            overflow-hidden
                            border
                            border-white/10
                            bg-[#0d0d0d]
                            shadow-[0_0_80px_rgba(255,255,255,0.08)]
                            animate-[fadeIn_.4s_ease]
                        "
                    >

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={handleClose}
                            className="
                                absolute
                                top-4
                                right-4
                                z-30
                                w-8
                                h-8
                                rounded-full
                                bg-black/60
                                border
                                border-white/10
                                text-white
                                flex
                                items-center
                                justify-center
                                hover:bg-white
                                hover:text-black
                                transition-all
                                duration-300
                            "
                        >
                            <X size={15} />
                        </button>

                        {/* IMAGE */}
                        <div className="relative">

                            <img
                                src={`http://localhost:5000${activeAudition.audition_poster}`}
                                alt="Audition Poster"
                                className="
                                    w-full
                                    h-[420px]
                                    object-cover
                                "
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        </div>

                        {/* CONTENT */}
                        <div className="p-5">

                            <p className="text-[9px] uppercase tracking-[0.38em] text-white/40 mb-3">
                                Moonlight Motion Pictures
                            </p>

                            <h2
                                className="
                                    text-white
                                    font-bold
                                    leading-tight
                                    mb-3
                                "
                                style={{
                                    fontSize: "clamp(1.2rem,3vw,1.8rem)",
                                    fontFamily: "'Syne', sans-serif",
                                    letterSpacing: "-0.03em"
                                }}
                            >
                                Open Audition
                            </h2>

                            <p className="text-white/55 text-sm leading-relaxed mb-6">
                                Applications are now open for upcoming cinematic productions.
                                Join the audition process and showcase your talent.
                            </p>

                            {/* APPLY BUTTON */}
                            <a
                                href="/audition"
                                className="
                                    w-full
                                    h-11
                                    rounded-2xl
                                    bg-white
                                    text-black
                                    text-[10px]
                                    uppercase
                                    tracking-[0.28em]
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    hover:scale-[1.02]
                                    transition-all
                                    duration-300
                                "
                            >
                                Apply Now
                            </a>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuditionModal;