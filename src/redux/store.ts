import { configureStore } from "@reduxjs/toolkit";
import  taskSliceReducer  from "./taskSlice";
export default configureStore({
    reducer:{
        task:taskSliceReducer
    }
})