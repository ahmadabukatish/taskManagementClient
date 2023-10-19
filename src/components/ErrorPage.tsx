import { useNavigate } from "react-router-dom";

function ErrorPage(){
    const navigate=useNavigate();

    return(
        <div>
        <p> cant connect with the server, try again later
            or inter a valid task
        </p>
        <button onClick={()=>{
            navigate(-1)

        }}>click me to go back</button>
        </div>
    )
}
export default ErrorPage