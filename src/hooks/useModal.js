//hook personalizado para abrir y cerrar la ventana modal.

import { useState } from 'react';

export default function useModal(initialValue = false) {
  // por defecto es false para que el modal no aparezca al iniciar la página sino que espere el click
  const [isOpen, setIsOpen] = useState(initialValue);
  //metodo para abrir el modal.
  const openModal = () => {
    setIsOpen(true);
  };
  //metodo para cerrar el modal.
  const closeModal = () => {
    setIsOpen(false);
  };
  return [isOpen, openModal, closeModal];
}
