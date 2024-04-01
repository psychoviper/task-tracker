import logo from '../../public/logo.png'

export default function Empty(){
    return(
        <div id='empty'>
            <h1>No Task!</h1>
            <img src={logo}></img>
            <h3>Please Add task or refine applied filters.</h3>
        </div>
    )
}