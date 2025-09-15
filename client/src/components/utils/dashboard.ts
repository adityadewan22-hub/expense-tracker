import type { Expense } from "../ExpenseList";
import { groupByCategory,groupByMonth,calculateBalance } from "./grouping";

export function dashboardSummary(expenses:Expense[]){
    return{
        balance:calculateBalance(expenses),
        byCategory:groupByCategory(expenses),
        byMonth:groupByMonth(expenses)
    }
}