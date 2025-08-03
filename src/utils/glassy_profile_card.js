import { useState, useRef, useEffect } from "react";
import { Mail, Linkedin, Instagram } from "lucide-react";

export default function GlassyProfileCard({
                                              name,
                                              bio,
                                              designation,
                                              imageUrl,
                                              linkedinUrl,
                                              instagramUrl,
                                              email,
                                          }) {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);
    const popupRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsHovered(false);
            }
        };

        if (isHovered) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isHovered]);

    return (
        <>
            {/* Profile Card */}
            <div
                onClick={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer flex flex-col items-center justify-start"
            >
                {/* Avatar */}
                <div className="relative z-10">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-30 h-30 rounded-full object-contain shadow-lg border-4 border-transparent"
                    />
                </div>

                {/* Glass card */}
                <div className="-mt-6 bg-purple-200/10  backdrop-blur-md border border-purple-400/20 text-center px-4 py-3 rounded-xl w-60 shadow-md z-0">
                    <h3 className="text-white pt-6 font-semibold text-sm">{name}</h3>
                    <h3 className="text-white pt-1 font-semibold text-sm">{designation}</h3>
                    <p className="text-xs text-gray-300 mt-1">{bio}</p>
                </div>
            </div>

            {/* Popup Overlay */}
            {isHovered && (
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
                >
                    <div
                        ref={popupRef}
                        className="relative perspective-[1000px] w-80 mx-auto group"
                    >
                        {/* Floating Image */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-110 rounded-full">
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-32 h-32 rounded-full object-cover shadow-xl shadow-purple-500/30"
                            />
                        </div>

                        {/* Glass Card */}
                        <div
                            className="relative bg-purple-300/10 backdrop-blur-lg border border-purple-300/20 rounded-2xl shadow-2xl p-8 pt-20 group-hover:pt-30 text-center text-white transform-gpu transition-transform duration-500 hover:rotate-x-35"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-white">{name}</h3>
                            <p className="mt-2 text-gray-300">{bio}</p>
                            <p className="mt-1 text-gray-400 italic">{designation}</p>
                            <div className="flex justify-center gap-6 mt-6">
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Linkedin className="w-6 h-6 hover:text-purple-400" />
                                </a>
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram className="w-6 h-6 hover:text-purple-400" />
                                </a>
                                <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
                                    <Mail className="w-6 h-6 hover:text-purple-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
