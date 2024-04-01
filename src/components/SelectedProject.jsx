import { useRef, useEffect } from "react";
import Modal from "./Modal";
import Form from "./Form";
// Component responsible for Editinf existing Task.
export default function SelectedProject({project, onDelete, onClose}){
    const modal=useRef();
// Connects with the modal after the file has been loaded. Displays the modal when the connection is established.
    useEffect(()=>{
        modal.current.open();
    },[])
// function retrieves the data for status and priority and updates them to the project management state.
    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        project.status=data.status;
        project.priority=data.priority;
        onClose();
    }
    return(
        <>
        <Modal ref={modal} value='Save' onClose={onClose} onClick={handleSubmit}>
            <Form project={project} title={'EDIT TASK'} onDelete={onDelete} onClose={onClose}/>  
        </Modal>
        </>
    )
}
