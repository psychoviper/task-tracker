import { useState } from 'react'
import { useEffect } from 'react';
import logo from '../src/assets/profile.png'
import NewProject from './components/NewProject.jsx';
import SelectedProject from './components/SelectedProject.jsx';
import Content from './components/Content.jsx';
import Select from './components/Select.jsx';
import Input from './components/Input.jsx';
import Calendar from './components/Calendar.jsx';

// defining the structure of the project state;
const temp = {
  selectedId: undefined,
  projects: [],
};
//Retrieving projects/tasks from the local storage;
const storedProjects = JSON.parse(localStorage.getItem('selectedProjects')) || temp;
// Defining the filter object;
const filter = {
  priority: 'Select',
  assignee: '',
  startDate: '',
  endDate: '',
}

function App() {
  // initializing the task state;
  const [selectedProject, setSelectedProject] = useState({
    ...storedProjects,
    selectedId: undefined,
    sortBy: 'Select',
    filterBy: { ...filter }
  });
  //initializing the state of the assignee.
  const [assigneeName, setAssigneeName] = useState('');
  //adding the newly added projects into the local storage after every state updation;
  useEffect(() => {
    localStorage.setItem('selectedProjects', JSON.stringify(selectedProject))
  }, [selectedProject]);

  // function to retrieve dates from the form; 
  function handleDates(values, dates) {
    const value1 = dates[0];
    const value2 = dates[1];
    setSelectedProject((prevValue) => {
      return {
        ...prevValue,
        filterBy: {
          ...prevValue.filterBy,
          startDate: value1,
          endDate: value2,
        }
      }
    })
  }
  // function to update the current name of the assignee after every keystroke.
  function handleName(event) {
    setAssigneeName(event.target.value);
  }
  // function to sort the task accordingly;
  function handleSort(event) {
    const name = event.target.value
    setSelectedProject((prevValue) => {
      return {
        ...prevValue,
        sortBy: name
      }
    })
  }
  // function to filter the task according to the selected values;
  function handleFilter(event) {
    setSelectedProject((prevValue) => {
      return {
        ...prevValue,
        filterBy: {
          ...prevValue.filterBy,
          priority: event.target.value,
        }
      }
    })
  }
  // function to help open the Create New Task modal.
  function handleClick() {
    setSelectedProject(prevValue => {
      return {
        ...prevValue,
        selectedId: null,
      }
    })
  }
  // function to update the currently selected task, to help open Edit Task Modal;
  function handleSelect(id) {
    setSelectedProject(prevValue => {
      return {
        ...prevValue,
        selectedId: id,
      }
    })
  }
  // function to delete selected projects/tasks.
  function handleDelete() {
    setSelectedProject(prevValue => {
      return {
        ...prevValue,
        selectedId: undefined,
        projects: prevValue.projects.filter((project) => project.id !== prevValue.selectedId),
      }
    })
  }
  // function to save new tasks/projects into the project state management.
  function handleSave(newProject) {
    const project = {
      ...newProject,
      id: Math.random(),
    }
    setSelectedProject(prevValue => {
      return {
        ...prevValue,
        selectedId: undefined,
        projects: [...prevValue.projects, project]
      }
    })
  }
  // function to close the modal.
  function handleClose() {
    setSelectedProject(prevValue => {
      return {
        ...prevValue,
        selectedId: undefined,
      }
    })
  }

  // getting the data for the selected prject{id-null:Create New Task Modal,  id-undefined: Displays the Content 
  // else id gives the projectId which is selected} 
  const project = selectedProject.projects.find(project => project.id === selectedProject.selectedId)
  // if true displays the EDIT Task Modal.
  let content = <SelectedProject project={project} onDelete={handleDelete} onClose={handleClose} />;
  // if true opens the Create New Task Modal.
  if (selectedProject.selectedId === null) content = <NewProject onSave={handleSave} onClose={handleClose} />
  // if true displays the content.
  else if (selectedProject.selectedId === undefined) content = <p className='mt-8'><button onClick={handleClick}>Add New Task</button></p>;


  return (
    <>
      <main id='main-container'>
        {/* Header */}
        <header id='main-header'>
          <h1>Task Board</h1>
          <img src={logo}></img>
        </header>
        {/* Content */}
        <div id='content'>
          {/* Box-1 */}
          <div className='box' id='box-1'>
            <div id='box-1left'>
              <form >
                <h3><b>Filter By: &nbsp;</b></h3>
                <Input id='inputt' name='assignee' placeholder='Assignee Name' onChange={handleName} value={assigneeName} />
                <Select name="priority" values={['Select', 'P0', 'P1', 'P2']} defaultValue={'Select'} onSelect={handleFilter} />
              </form>
              <Calendar handleDates={handleDates} />
            </div>
            <div>{content}</div>
          </div>
          {/* Box-2 */}
          <div className='box' id='box-2'>
            <div id='sufi'>
              <h3><b>Sort By:</b> </h3>
              <Select name="sort" values={['Select', 'Priority', 'Date']} defaultValue={'Select'} onSelect={handleSort} />
            </div>
          </div>
          {/* Box-3 */}
          <div className='box' id='box-3'>
            <Content data={selectedProject} assignee={assigneeName} handleSelect={handleSelect} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;