import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function Modal(props) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        props.onClose();
      }
    };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      props.onClose();
    }
  };

  return createPortal(
    <div className={css.Modal__backdrop} onClick={handleBackdropClick}>
      <div className={css.Modal__content}>{props.children}</div>
    </div>,
    modalRoot
  );
}
