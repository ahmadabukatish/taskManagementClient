import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from "../redux/taskSlice";
import TaskCard from "./TaskCard";
import {MdOutlineFilterAlt} from 'react-icons/md';
import Axios  from "axios";
import {BiSolidAddToQueue} from 'react-icons/bi';


interface Props
{
    title:string;
    description:string;    
    dueDate:Date;
    status:string;
}

function ListGroup()
{
    let itemsArr:Props[]=useSelector((state :{task:any})=> state.task.value);
    const navigate=useNavigate();
    const [select,setSelect]=useState('pending first');
    const [filter,setFilter]=useState(0);
    const dispatch = useDispatch()
    const availableStatus=[['completed','pending'],['pending'],['completed']]
    const mainTitle=['All Tasks','Pending Tasks','Completed Tasks']
    useEffect(()=>
    {
    Axios.get("https://taskmanageapp-02a301c13f32.herokuapp.com/api/get").then((response)=>{
        
            dispatch(addTask(response.data));

    })
    },[])

    const sortByPending=(a:Props,b:Props)=>
    {
        if (a.status=="pending"){
            return 1;
        }
        return -1;
    }
    const sortByCompleted=(a:Props,b:Props)=>
    {
        if (a.status=="pending"){
            return -1;
        }
        return 1;
    }
    const sortFunc=[sortByPending,sortByCompleted]

    const handleSortClick=(e:any)=>
    {
        setSelect(e.target.value)
        let sortIdx=select=="pending first"? 0:1;
        let t=[...itemsArr]
        t.sort(sortFunc[sortIdx])
        dispatch(addTask(t))   
    }

    return (
    <div>
        <div className="card text-center" style={{flexDirection:'row',justifyContent:'center', backgroundColor:"#5f5882"}}>
        <div style={{float:'left',flex:1.2}}>
        <h1 style={{float:'left'}} >{mainTitle[filter]}</h1>
        </div>
        <div  style={{borderRadius:25,padding:10,flex:0.8}}>
        <BiSolidAddToQueue size={40} style={{float:'left'}}
                onClick={()=>{navigate('newTodoItem');}
                }/>
        </div>
        <div>
        <select value={select} 
            style={{float:"right",marginTop:5,flex:0.8,padding:5,backgroundColor:"#5f5882", border: "0px"}}
            onChange={(e)=>{handleSortClick(e)}}>
            <option>pending first</option>        
            <option>completed first</option>        
        </select> 
        <label style={{float:"right",flex:1,padding:5,backgroundColor:"#5f5882",marginTop:5}}>sorted by: </label>
        </div>
        <MdOutlineFilterAlt size={40} onClick={()=>{setFilter((filter+1)%3)}}style={{flex:0.2,marginTop:5}} />

        </div>
   
        <ul className="list-group">
        {itemsArr.map((item:Props,index:number) =>
                <>
                {availableStatus[filter].includes(item.status)?
                    
                    <TaskCard index={index}></TaskCard>:null}   
        </>)}   
        </ul>
    </div>
  )
}
export default ListGroup


