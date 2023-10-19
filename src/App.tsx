import ListGroup from "./components/ListGroup"
import { Route,Routes } from "react-router-dom"
import AddNewTask from "./components/AddNewTask"
import ErrorPage from "./components/ErrorPage"

function App() {
  
  return (
    <Routes>
      <Route path='/' 
      element={<ListGroup/>} >
      </Route>
      <Route path='newTodoItem'
      element={<AddNewTask/>}>
    </Route> 
    <Route path='errorPage'
      element={<ErrorPage/>}>
    </Route> 
    </Routes>
  )
}

export default App
