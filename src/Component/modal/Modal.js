import React from 'react';
import './Modal.css';

export default function Modal(props) {
  const { children, isOpen, closeModal,error } = props;

  /*
    funcion para detener la propagacion de evento click en pantalla borrrosa.
  */
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <article onClick={closeModal} className={`modal ${isOpen && 'is-open'}`}>
        <div onClick={handleClick} className={error===true ? "modal-error"  : "modal-container" }>
          {children}
        </div>
      </article>
    </>
  );
}
