import Bar from "./Bar"
import Empty from "./Empty";

export default function Content({data, assignee, handleSelect}){

    let projectDisplay=[...data.projects];
// function to check if the task date lies within the selected range;
    function isInRange(date,start,end){
        return (new Date(date)>=new Date(start) && new Date(date)<= new Date(end));
    }
// fitler data according to the assignee name.
    if(assignee!==''){
        projectDisplay=projectDisplay.filter((project)=>{
            if(project.assignee.toLowerCase()==assignee.toLowerCase()){
            return true;
        }
        return false;
        });
    }
// from the filtered data again filter them according to the priority.
    if(data.filterBy.priority!=='Select'){
        projectDisplay=projectDisplay.filter((project)=>{
            if(project.priority===data.filterBy.priority)return true;
            return false;
        });
    }
// from the filtered data again filter them according to the date range.
    if(data.filterBy.startDate!==''){
        projectDisplay=projectDisplay.filter((project)=>{
            if(isInRange(project.date,data.filterBy.startDate,data.filterBy.endDate))return true;
            return false;
        })
    }
// sort the resulting data according to priority.
    if (data.sortBy === 'Priority')projectDisplay.sort((a, b) => a.priority > b.priority ? 1 : -1);
// sort the resulting data according to start Date.
    else if (data.sortBy === 'Date')projectDisplay.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1); 

    if(projectDisplay.length===0){
        return(<Empty/>)
    }

    return(
        <>
        {/* Pending Section */}
        <div className='taskbar' id='taskbar-1'>
            <Bar projects={projectDisplay.filter((project) => project.status === 'Assign')} onEdit={handleSelect}>Pending</Bar>
        </div>
        {/* In Progress Section */}
        <div className='taskbar' id='taskbar-2'>
            <Bar projects={projectDisplay.filter((project) => project.status === 'In Progress')} onEdit={handleSelect}>In Progress</Bar>
        </div>
        {/* Completed Section */}
        <div className='taskbar' id='taskbar-3'>
            <Bar projects={projectDisplay.filter((project) => project.status === 'Completed')} onEdit={handleSelect}>Completed</Bar>
        </div>
        {/* Deployed Section */}
        <div className='taskbar' id='taskbar-4'>
            <Bar projects={projectDisplay.filter((project) => project.status === 'Deployed')} onEdit={handleSelect}>Deployed</Bar>
        </div>
        {/* Deffered Section */}
        <div className='taskbar' id='taskbar-5'>
            <Bar projects={projectDisplay.filter((project) => project.status === 'Deffered')} onEdit={handleSelect}>Deffered</Bar>
        </div>
        </>
    )
}