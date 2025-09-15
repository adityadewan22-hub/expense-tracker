import axios from "axios";
import type { Expense } from "./components/ExpenseList";

const api= axios.create({
    baseURL:"http://localhost:3000/api",
});

api.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token");
    if(token){
        req.headers.Authorization=`Bearer ${token}`;
    }
    return req;
});

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response&&error.response.status===401){
            localStorage.removeItem("token");
            window.location.href="/login";
        }
        return Promise.reject(error);
    }
    );

export const FetchExpense=async()=>{
    const res= await api.get("/expense");
    return res.data;
}
export const addExpense=async(data:any)=>{
    const res =await api.post("/expense",data);
    return res.data;
}
export const updateExpense=async(_id :string,data:Partial<Expense>):Promise<Expense>=>{
    const res=await api.patch<Expense>('/expense',{_id,...data});
    return res.data;
}
export const deleteExpense=async(_id:string)=>{
    const res=await api.delete('/expense',{data:{_id}});
    return res.data;
}