import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import useAuditions from "../../hooks/useAuditions";
import { BASE_URL } from "../../utils/api";

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
<div>
    {/* OPEN BUTTON */}
    {!open && (
        <button
            onClick={() => setOpen(true)}
            className="
                fixed
                bottom-4
                right-4
                sm:bottom-6
                sm:right-6
                z-[999]
                h-10
                sm:h-11
                px-4
                sm:px-5
                rounded-full
                bg-white
                text-black
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-[0.25em]
                sm:tracking-[0.28em]
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
                p-3
                sm:p-4
                overflow-y-auto
            "
        >

            {/* CARD */}
            <div
                className="
                    relative
                    w-full
                    max-w-md
                    rounded-[28px]
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#0d0d0d]
                    shadow-[0_0_80px_rgba(255,255,255,0.08)]
                    animate-[fadeIn_.4s_ease]
                    my-auto
                "
            >

                {/* CLOSE BUTTON */}
                <button
                    onClick={handleClose}
                    className="
                        absolute
                        top-3
                        right-3
                        sm:top-4
                        sm:right-4
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
                        src={`${BASE_URL}${activeAudition.audition_poster}`}
                        alt="Audition Poster"
                        className="
                            w-full
                            h-[260px]
                            xs:h-[320px]
                            sm:h-[420px]
                            object-contain
                        "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-5">

                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.38em] text-white/40 mb-3">
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
                            fontSize: "clamp(1.15rem,5vw,1.8rem)",
                            fontFamily: "'Syne', sans-serif",
                            letterSpacing: "-0.03em"
                        }}
                    >
                        Open Auditions Now
                    </h2>

                    <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-6">
                        Applications are now open for upcoming cinematic productions.
                        Join the audition process and showcase your talent.
                    </p>

                    {/* APPLY BUTTON */}
                    <a
                        href="/audition"
                        className="
                            w-full
                            h-11
                            sm:h-12
                            rounded-2xl
                            bg-white
                            text-black
                            text-[10px]
                            uppercase
                            tracking-[0.25em]
                            sm:tracking-[0.28em]
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
</div>
    );
};

export default AuditionModal;