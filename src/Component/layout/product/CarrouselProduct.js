import React, { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineExpand, AiFillCloseCircle } from 'react-icons/ai';
import { BiRadioCircleMarked } from "react-icons/bi";
import "./CarrouselProduct.css"
import useModal from "../../../hooks/useModal";
import Modal from "../../modal/Modal";

export default function CarrouselProduct(props) {

    const { attributes } = props;
    const slides = attributes?.attributes?.imagen?.data;

    const [indexImagen, setIndexImagen] = useState(0);

    const [isOpenModal, openModal, closeModal] = useModal(false);

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
                    {(slides?.length !== 1) &&
                        <>
                            <div className="leftArrowStyle" onClick={gotoNext}>
                                <AiFillCaretRight />
                            </div>
                            <div className="rightArrowStyle" onClick={gotoPrevius}>
                                <AiFillCaretLeft />
                            </div>
                        </>
                    }
                    <div className="fullscreen" onClick={openModal}><AiOutlineExpand /></div>
                    <div style={slidesStyles}></div>
                </div>
                <div className="dotsContainerStyles">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className="dotStyles"
                            onClick={() => goToSlide(slideIndex)}
                        >
                            <BiRadioCircleMarked />
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={isOpenModal} closeModal={closeModal} >

                <div className="Modal_containerStyle">
                    <div className="Modal_sliderContainControl">
                        {(slides?.length !== 1) &&
                            <>
                                <div className="leftArrowStyle" onClick={gotoNext}>
                                    <AiFillCaretRight />
                                </div>
                                <div className="rightArrowStyle" onClick={gotoPrevius}>
                                    <AiFillCaretLeft />
                                </div>
                            </>
                        }
                        <div className="fullscreen" onClick={closeModal}><AiFillCloseCircle /></div>
                        <div style={slidesStyles} onClick={openModal}></div>
                    </div>
                </div>
            </Modal>


        </>
    )
}