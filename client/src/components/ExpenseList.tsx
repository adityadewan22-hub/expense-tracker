import React, { useEffect, useState } from "react";
import { fetchExpense } from "../api";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetchExpense()
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>{exp.title}-$(exp.amount)</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
