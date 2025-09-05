import type { Expense } from "../ExpenseList";

export function sortExpenses(
    expenses:Expense[],
    key:"amount"|"date"|"category",
    order: "asc" | "desc"= "asc"
){
    return [...expenses].sort((a,b)=>{
        let comp=0;
        if(key==='amount'){
            comp=a.amount-b.amount;
        }
        if(key==='date'){
            comp= new Date(a.date).getTime()-new Date(b.date).getTime();
        }
        if(key==='category'){
            comp= a.category.localeCompare(b.category);
        }

        return order ==="asc"?comp:-comp;
    });
}