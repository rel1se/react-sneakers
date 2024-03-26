import React, { useState, useEffect, useRef } from "react";
import sliderImg3 from "../assets/img/slider-img-1.png";
import sliderImg4 from "../assets/img/slider-img-2.jpg";
import sliderImg6 from "../assets/img/slider-img-3.png";

const images: string[] = [sliderImg3, sliderImg4, sliderImg6];
const delay: number = 5000;

const Slider: React.FC = () => {
    const [index, setIndex] = useState<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, delay);

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {images.map((image, idx) => (
                    <div
                        className="slide"
                        key={idx}
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;