import css from './ButtonClose.module.css'
import { CgCloseR } from "react-icons/cg";

export function ButtonClose ({onClick}) {

    return (
        <button className={css.Button__close}  type="button" onClick={onClick}>
              <CgCloseR className={css.buttonIcons}/>
            </button>
    )
}