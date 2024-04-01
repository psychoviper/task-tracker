import Modal from "./Modal";
import { useRef } from "react";
import Form from "./Form";
import { useEffect } from "react";
// Component responsible for New Projects.
export default function NewProject({ onSave, onClose }) {
    const modal = useRef();
// Connects with the modal after the file has been loaded. Displays the modal when the connection is established.
    useEffect(() => {
        modal.current.open();
    }, [])
// gets the current date of that day.
    let currentDate = new Date().toJSON().slice(0, 10);
// function retrieves all the data entered in the form fields and passes them onto the handleSave function in App.jsx.
// current date and asssign status is added by default to the input.
    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        data.date = currentDate;
        data.status = 'Assign';
        onSave(data);
    }
    return (
        <>
            <Modal ref={modal} value='Save' onClick={handleSubmit} onClose={onClose} >
                <Form title={'CREATE A TASK'} onClose={onClose} />
            </Modal>
        </>
    );
}