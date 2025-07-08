import type { ComponentPropsWithRef, FC} from "react";
import styles from './Button.module.css'
import {clsx} from "clsx";
import {forwardRef} from "react";


interface IButton extends ComponentPropsWithRef<'button'> {
}

export const NextButton: FC<IButton> = forwardRef(({children,...rest}, ref) => {
    return (
        <button ref={ref} tabIndex={-1} {...rest} className={clsx(styles.button)}>
            {children}
        </button>
    );
});





