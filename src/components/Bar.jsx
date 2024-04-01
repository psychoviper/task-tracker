export default function Bar({ projects, onEdit, children }) {
    return (
        <>
        {/* Displays the Category. */}
            <h2>{children}</h2>
            <section>
                {/* Displays all the tasks belonging to this particular Category. */}
                {projects.map((project) => {
                    return (
                        <div key={project.id}>
                            <header>
                                <h3>{project.title}</h3>
                                <p>{project.priority}</p>
                            </header>
                            <p id="description">{project.description}</p>
                            <div>
                                <p><b>@{project.assignee}</b></p>
                                <button onClick={() => onEdit(project.id)}>&nbsp;&#10247;</button>
                            </div>
                            <p id="status">{project.status}</p>
                        </div>
                    )
                })}
            </section>
        </>
    )
};