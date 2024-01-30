import { Component } from "react";
import css from './Modal.module.css';
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal-root')

export class Modal extends Component {

    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e) => {
        if(e.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleBackdropClick = ({target, currentTarget}) => {
        if(target === currentTarget){
            this.props.onClose()
        }
    }

    render(){
        return createPortal (
            <div className={css.Modal__backdrop} onClick={this.handleBackdropClick}>
                <div className={css.Modal__content}>{this.props.children}</div>
            </div>, modalRoot
        )
    }
}