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
                className="cursor-pointer w-72 h-72 flex flex-col items-center p-4 bg-transparent rounded-2xl shadow-lg relative z-10"
            >
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg z-10"
                />
                <h3 className="mt-4 text-white font-semibold text-lg">{name}</h3>
                <p className="text-sm text-gray-300">{bio}</p>
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
                        className="relative perspective-[1000px] w-80 mx-auto group" // group added
                    >
                        {/* Floating Image with hover animation */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-170 rounded-full">
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-32 h-32 rounded-full object-cover shadow-xl"
                            />
                        </div>

                        {/* Glass Card */}
                        <div
                            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 pt-20 group-hover:pt-30 text-center text-white transform-gpu transition-transform duration-500 hover:rotate-x-35"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold">{name}</h3>
                            <p className="mt-2 text-gray-300">{bio}</p>
                            <p className="mt-1 text-gray-400 italic">{designation}</p>
                            <div className="flex justify-center gap-6 mt-6">
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Linkedin className="w-6 h-6 hover:text-blue-500" />
                                </a>
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram className="w-6 h-6 hover:text-pink-500" />
                                </a>
                                <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
                                    <Mail className="w-6 h-6 hover:text-red-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
