import React from 'react';

interface FoodCardProps {
    image: string;
    name: string;
    description: string;
    price: number;
    rating?: number;
    isWishlisted?: boolean;
    onToggleWishlist?: () => void;
    isDarkMode?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ image, name, description, price, rating = 4.5, isWishlisted = false, onToggleWishlist, isDarkMode = false }) => {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id={`half-${i}`}>
                                <stop offset="50%" stopColor="#FFD700" />
                                <stop offset="50%" stopColor="#D1D5DB" />
                            </linearGradient>
                        </defs>
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={`url(#half-${i})`} />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#D1D5DB" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className={`food-card rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden w-full transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Image Container */}
            <div className={`relative pt-8 pb-4 px-8 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[200px] object-cover drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]"

                />
                {/* Heart Icon */}
                <button
                    onClick={onToggleWishlist}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}
                >
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 17.5L8.55 16.2C3.4 11.56 0 8.52 0 4.75C0 2.08 2.08 0 4.75 0C6.26 0 7.71 0.69 8.68 1.78C9.03 2.17 9.33 2.61 9.58 3.08C9.83 2.61 10.13 2.17 10.48 1.78C11.45 0.69 12.9 0 14.41 0C17.08 0 19.16 2.08 19.16 4.75C19.16 8.52 15.76 11.56 10.61 16.2L10 17.5Z"
                            fill={isWishlisted ? "#FF6A44" : "none"}
                            stroke="#FF6A44"
                            strokeWidth="1.5"
                        />
                    </svg>
                </button>
            </div>

            {/* Content Container */}
            <div className="p-4 md:p-6 pb-4 md:pb-5">
                {/* Title */}
                <h3 className="text-[#FF3333] text-[22px] md:text-[28px] font-bold mb-2 md:mb-3 text-center leading-tight">
                    {name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                    <div className="flex gap-1">
                        {renderStars()}
                    </div>
                    <span className={`text-xs md:text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {rating.toFixed(1)}
                    </span>
                </div>

                {/* Description */}
                <p className={`text-[12px] md:text-[13px] leading-relaxed mb-4 md:mb-6 text-center px-1 md:px-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {description}
                </p>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                    <span className={`text-[14px] md:text-[16px] font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ฿ {price.toFixed(2)}
                    </span>
                    <button className="w-10 h-10 bg-[#FF6A44] rounded-lg flex items-center justify-center shadow-md hover:bg-[#FF5533] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
