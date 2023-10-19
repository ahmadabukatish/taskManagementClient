
import { useNavigate } from "react-router-dom";
import '../index.css'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from "../redux/taskSlice";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Axios  from "axios";


function AddNewTask(){
    const navigate=useNavigate();
    let taskArr = useSelector((state :{task:any})=> state.task.value)
    const dispatch = useDispatch()
    const [titleState,setTitleState]=useState("");
    const [descriptionState,setDescriptionState]=useState("");
    const [dueDateState,setDueDateState]=useState(new Date());

    const handleSaveTask=()=>
    {
        let m=dueDateState.getMonth()+1;
        let time=''
        time=dueDateState.getDate()+'/'+m+'/'+dueDateState.getFullYear()
        Axios.post("https://taskmanageapp-02a301c13f32.herokuapp.com/api/insert",{title:titleState,decription:descriptionState,duedate:time,
        status:'pending'}).then(()=>{

        }).catch(e=>{navigate('../errorPage')});
      
        taskArr=[...taskArr,{title:titleState,description:descriptionState,dueDate:time,status:'pending'}];
        dispatch(addTask(taskArr));
        navigate(-1);
    }

    return (
    <>
        <div className="task"> 
        <button type="button" className="btn-close" aria-label="Close"
        onClick={()=>{navigate(-1)}}
        ></button>
            <h2>Add new task</h2>
            <form>
                <label>Title</label>
                <input 
                    type="text"
                    required
                    value={titleState}
                    onChange={(e)=>{setTitleState(e.target.value)}}
                />
                <label>Description</label>
                <textarea required value={descriptionState}
                    onChange={(e)=>{setDescriptionState(e.target.value)}}
                />
                <label>Due Date</label>
                <DatePicker showIcon selected={dueDateState}
                 onChange={(date:Date) => setDueDateState(date)} dateFormat="dd/MM/yyyy"/>
            </form>
            <button type="button" className="btn btn-primary" 
                onClick={()=>{
                     handleSaveTask()}}>save
            </button>
        </div>
    </>
    )
}
export default AddNewTask

