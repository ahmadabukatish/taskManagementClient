import { useSelector, useDispatch } from 'react-redux'
import { addTask } from "../redux/taskSlice";
import {MdDeleteForever} from 'react-icons/md';
import Axios  from "axios";
import { useNavigate } from "react-router-dom";

interface Props{
    index:number;
}

function TaskCard({index}:Props)
{
    let itemsArr=useSelector((state :{task:any})=> state.task.value);
    const dispatch = useDispatch()
    let item=itemsArr[index];
    const navigate=useNavigate();
    const handleDeleteItem=()=>
    {
        Axios.delete(`https://taskmanageapp-02a301c13f32.herokuapp.com/api/delete/${item.title}`).catch(e=>{navigate('../errorPage')});
        let temp=[...itemsArr];
        temp.splice(index,1)
        dispatch(addTask(temp));
    }

    const handleChangeStatus=(e:any)=>
    {
        Axios.put("https://taskmanageapp-02a301c13f32.herokuapp.com/api/update",{title:item.title,status:e.target.value}).catch(e=>{navigate('../errorPage')});
        let temp=[...itemsArr];
        temp.splice(index,1)
        temp=[...temp,{title:item.title,decription:item.decription,duedate:item.duedate,status:e.target.value}];
        dispatch(addTask(temp));
    }


    return (
    <>
        <div className="card text-center" style={{marginTop:10}}>
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-title">{item.decription}</p>
            </div>
            <div className="card-footer text-body-secondary" style={{float:'left', backgroundColor:"#c2b9f3"}}>
                 <label style={{float:'left'}}>  {item.duedate}</label> 
                    <MdDeleteForever size={25} style={{float:"right"}}onClick={()=>{handleDeleteItem();}}/>
                    <select 
                        value={item.status}
                        onChange={(e)=>{handleChangeStatus(e);}}
                        style={{float:"right",marginRight:15,backgroundColor:(item.status=="completed")?"green":"red"}}>
                        <option value="pending">pending</option>            
                        <option value="completed">completed</option>            
                    </select>  
            </div>
        </div>
    </>  
    )}

 export default TaskCard;