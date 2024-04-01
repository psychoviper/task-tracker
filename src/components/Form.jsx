import Input from "./Input";
import Select from "./Select";

// Reusable form.
export default function Form({ project, title, onDelete, onClose }) {
    let content = '';
    let delete_button = '';
    let disable=false;
// if no project/task is selected disply the form with null values in the input fields.
    let temp = {
        id: '',
        title: '',
        description: '',
        team: '',
        assignee: '',
        priority: '',
        status: '',
    }
// if project/task is selected display the form with prefilled data.
    if (project) {
        temp = { ...project };
        // Do not display the delete button when the selected task is in the completed category.
        if (project.status !== 'Completed') delete_button = <button onClick={onDelete}>Delete</button>;
        // display the status conditionally in the case of Editing existing task and not when new task is created
        // as by default it would be added in the Pending section(assumption).
        content = <Select id='status' name='status' values={['Assign', 'In Progress', 'Completed', 'Deployed', 'Deffered']} defaultValue={temp.status} required />;
        // Disable the form fields (except the status and priority) when editing a task.
        disable=true;
    }

    return (
        <div id="formm">
            {/* Header Section */}
            <div id="formm-header" >
                <h2>{title}</h2>
                {/* Cross cut */}
                <div className="circle" onClick={onClose}>
                    <div className="cross">
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
            {/* Body Section */}
            <div id="formm-body">
                <div className="formm-body-items">
                    Title:
                    <Input type='text' name='title' disabled={disable} defaultValue={temp.title} required />
                </div>
                <div className="formm-body-items">
                    Description:
                    <Input type='text' name='description' disabled={disable} defaultValue={temp.description} isText required />
                </div>
                <div className="formm-body-items">
                    Team:
                    <Input type='text' name='team' disabled={disable} defaultValue={temp.team} required />
                </div>
                <div className="formm-body-items">
                    Assignee:
                    <Input type='text' name='assignee' disabled={disable} defaultValue={temp.assignee} required />
                </div>
                <div className="formm-body-items">
                    Priority:
                    <Select id='priority' name="priority" defaultValue={temp.priority} values={['P0', 'P1', 'P2']} required />
                    {content?' Status:':undefined}
                    {content}
                </div>
            </div>
            {/* Footer Section */}
            <div id="formm-footer">
                <input type='submit' />
                <input type='reset' />
                {delete_button}
            </div>

        </div>
    )
}