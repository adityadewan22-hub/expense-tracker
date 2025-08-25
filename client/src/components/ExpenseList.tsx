import React, { useEffect, useState } from "react";
import { addExpense, FetchExpense } from "../api";

interface Expense {
  _id: string;
  amount: number;
  category: string;
}

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
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

    const tempExpense: Expense = {
      _id: Date.now().toString(),
      amount: Number(amount),
      category,
    };

    setExpenses((prev) => [...prev, tempExpense]);

    setAmount("");
    setCategory("");
    try {
      const newExpense = await addExpense({
        amount: Number(amount),
        category,
      });
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === tempExpense._id ? newExpense : exp))
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
      setExpenses((prev) => prev.filter((exp) => exp._id !== tempExpense._id));
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
