import axios from "axios";

const api= axios.create({
    baseURL:"http://localhost:3000/api",
});

export const FetchExpense=async()=>{
    const res= await api.get("/expenses");
    return res.data;
}
export const addExpense=async(data:any)=>{
    const res =await api.post("/expenses",data);
    return res.data;
}
export const updateExpense=async(id :string,data:any)=>{
    const res=await api.patch(`/expenses/${id}`,data);
    return res.data;
}
export const deleteExpense=async(id:string)=>{
    const res=await api.delete(`/expenses/${id}`);
    return res.data;
}