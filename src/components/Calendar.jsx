import 'antd/dist/reset.css';
import { DatePicker } from 'antd';


const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD'

function Calendar({handleDates}){
    return(
        <RangePicker format={dateFormat}
        onChange={handleDates}
        />
    )
}

export default Calendar;