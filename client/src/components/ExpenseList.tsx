import React, { useEffect, useState } from "react";
import { addExpense, deleteExpense, FetchExpense, updateExpense } from "../api";

export interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
}

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

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
      date,
    };

    setExpenses((prev) => [...prev, tempExpense]);

    try {
      const newExpense = await addExpense({
        amount: Number(amount),
        category,
        date,
      });

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === tempExpense._id ? newExpense : exp))
      );

      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
      setExpenses((prev) => prev.filter((exp) => exp._id !== tempExpense._id));
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const success = await deleteExpense(_id);
      if (success) {
        setExpenses((prev) => prev.filter((e) => e._id !== _id));
      }
    } catch (err) {
      console.error("Error deleting expense", err);
    }
  };

  const handleEdit = async (_id: string, updatedData: Partial<Expense>) => {
    try {
      const success = await updateExpense(_id, updatedData);
      if (success) {
        setExpenses((prev) => prev.map((e) => (e._id === _id ? success : e)));
      }
    } catch (err) {
      console.error("Error updating expense", err);
    }
  };
  if (loading) return <div>Loading....</div>;

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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.category}-${exp.amount}({exp.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
