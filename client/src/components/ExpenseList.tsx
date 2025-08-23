import { useEffect, useState } from "react";
import { FetchExpense } from "../api";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    FetchExpense()
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.title}-${exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
