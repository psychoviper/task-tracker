import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({children, onClick, onClose},ref){

    const dialog =useRef();
// custom open function which can be invoked from outside to open/display the modal.
    useImperativeHandle(ref,()=>
        {
            return {
                open(){
                    dialog.current.showModal();
                }
            }
        }
    )

    return createPortal(
    // connecting the ref to the dialog; 
    <dialog ref={dialog} className='result-modal' onClose={onClose}>
        <form method='dialog' onSubmit={onClick}>    
        {/* children prop stores the Form component */}
            {children}
        </form>        
    </dialog>,document.getElementById("modal-root"));
})

export default Modal;