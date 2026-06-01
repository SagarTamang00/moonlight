import React from "react";

import {
    CalendarDays,
    ArrowUpRight,
    ArrowLeft,
} from "lucide-react";

import useNewsBlogs from "../../hooks/useNewsBlogs";
import { BASE_URL } from "../../utils/api";

const News = () => {

    const { news, loading } = useNewsBlogs();

    // BACK TO HOME
    const handleBackHome = () => {
        window.location.href = "/";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
                Loading News...
            </div>
        );
    }

    return (
        <section className="relative min-h-screen w-full bg-black overflow-hidden py-24">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 blur-[180px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

                {/* TOP BAR */}
                <div className="flex items-center justify-between mb-16">

                    <button
                        onClick={handleBackHome}
                        className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300"
                    >
                        <ArrowLeft
                            size={18}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        <span className="uppercase tracking-[0.25em] text-sm">
                            Back Home
                        </span>
                    </button>

                </div>

                {/* HEADER */}
                <div className="mb-20 text-center">

                    <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-4">
                        Moonlight Journal
                    </p>

                    <h1
                        className="text-white font-bold leading-none"
                        style={{
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            letterSpacing: "-0.04em",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        News & Blog
                    </h1>

                    <div className="w-24 h-px bg-white/20 mx-auto mt-8" />

                </div>

                {/* EMPTY STATE */}
                {news.length === 0 && (

                    <div className="text-center text-white/50 text-xl py-32">
                        No News Available
                    </div>

                )}

                {/* FEATURED NEWS */}
                {news.length > 0 && (

                    <div className="grid lg:grid-cols-2 gap-10 items-center mb-24">

                        {/* IMAGE */}
                        <div className="relative overflow-hidden rounded-3xl border border-white/10">

                            <img
                                src={`${BASE_URL}${news[0].news_poster}`}

                                alt={news[0].title}
                                className="w-full h-[500px] object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        </div>

                        {/* CONTENT */}
                        <div>

                            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-white/50 border border-white/10 rounded-full px-4 py-2 mb-6">
                                Featured Story
                            </span>

                            <h2 className="text-4xl md:text-5xl text-white font-bold leading-tight mb-6">
                                {news[0].title}
                            </h2>

                            <div className="flex items-center gap-3 text-white/40 text-sm mb-6">

                                <CalendarDays size={16} />

                                <span>Latest Update</span>

                            </div>

                            <p className="text-white/65 leading-relaxed text-lg mb-8 line-clamp-4">
                                {news[0].description}
                            </p>

                            {news[0].news_link && (

                                <a
                                    href={news[0].news_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white hover:text-black"
                                >

                                    Read Article

                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />

                                </a>
                            )}

                        </div>

                    </div>
                )}

                {/* NEWS GRID */}
                <div className="grid md:grid-cols-2 gap-8">

                    {news.slice(1).map((item) => (

                        <div
                            key={item.id}
                            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2"
                        >

                            {/* IMAGE */}
                            <div className="relative overflow-hidden">

                                <img
                                
                                    src={`${BASE_URL}${item.news_poster}`}
                                    alt={item.title}
                                    className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                            </div>

                            {/* CONTENT */}
                            <div className="p-8">

                                <div className="flex items-center justify-between mb-5">

                                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                                        News
                                    </span>

                                    <div className="flex items-center gap-2 text-white/35 text-xs">

                                        <CalendarDays size={14} />

                                        <span>Latest</span>

                                    </div>

                                </div>

                                <h3 className="text-2xl text-white font-semibold leading-snug mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-white/65 leading-relaxed text-lg mb-8 line-clamp-4">
                                    {item.description}
                                </p>

                                {item.news_link && (

                                    <a
                                        href={item.news_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group/btn inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-300"
                                    >

                                        Read More

                                        <ArrowUpRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                                        />

                                    </a>
                                )}

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default News;