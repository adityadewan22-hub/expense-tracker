import React, { useEffect, useState } from "react";
import { addExpense, FetchExpense } from "../api";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    FetchExpense()
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newExpense = await addExpense({
        amount,
        category,
      });
      setExpenses((prev) => [...prev, newExpense]);
      setAmount("");
      setCategory("");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  };

  if (loading) return <div>Loading....</div>;
  if (expenses.length === 0) {
    return <div>No expenses yet</div>;
  }

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={handleAddExpense}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="string"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.category}-${exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
