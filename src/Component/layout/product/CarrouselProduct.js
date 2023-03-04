import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight, AiTwotoneCrown } from 'react-icons/ai';
import "./CarrouselProduct.css"

export default function CarrouselProduct(props) {

    const { attributes } = props;
    const slides = attributes?.attributes?.imagen?.data;
    
    const [indexImagen, setIndexImagen] = useState(0);


    
    //estilos de las imagenes.
    const slidesStyles = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundImage: `url(${slides[indexImagen]?.attributes?.url})`,
    };

    const gotoPrevius = () => {
        const isFirsImage = indexImagen === 0;
        const newIndex = isFirsImage ? slides.length - 1 : indexImagen - 1;
        setIndexImagen(newIndex);
    };
    const gotoNext = () => {
        const isLastSlide = indexImagen === slides.length - 1;
        const newIndex = isLastSlide ? 0 : indexImagen + 1;
        setIndexImagen(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setIndexImagen(slideIndex);
    };

    return (
        <>
            <div className="containerStyle">
                <div className="sliderContainControl">
                    <div className="leftArrowStyle" onClick={gotoNext}>
                        <AiOutlineRight />
                    </div>
                    <div className="rightArrowStyle" onClick={gotoPrevius}>
                        <AiOutlineLeft />
                    </div>
                    <div style={slidesStyles}></div>
                </div>
                <div className="dotsContainerStyles">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className="dotStyles"
                            onClick={() => goToSlide(slideIndex)}
                        >
                            <AiTwotoneCrown />
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}