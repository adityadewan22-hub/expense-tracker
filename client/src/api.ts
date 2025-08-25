import axios from "axios";

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