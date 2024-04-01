import { forwardRef } from "react";
// customizable Input component.
const Input = forwardRef(function Input({label, isText, ...props},ref){
    return(
        <p>
            <label>{label}</label>
            {isText ? <textarea ref={ref} {...props} /> : <input ref={ref} {...props} />}
        </p>
    );
})

export default Input;