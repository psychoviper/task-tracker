export default function Select({name, values, onSelect, ...props}){
    // Customizable & reusable select dropdown component.
    return(
        <select name={name} {...props} onChange={onSelect}>
            {values.map((value)=>{
                return(
                    <option key={value} name={value} >{value}</option>
                )
            })}
        </select>
    )
}