import { useState } from "react";
import type { Expense } from "../components/ExpenseList";
import ExpenseList from "../components/ExpenseList";
import { recordAction, redo, undo } from "../components/utils/undo,redo";
import { dashboardSummary } from "../components/utils/dashboard.ts";
import { analytics } from "../components/utils/analytics.ts";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [_, setForceUpdate] = useState(0);

  const handleAddExpense = (expense: Expense) => {
    recordAction({ type: "add", expense });
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDelete = (expense: Expense) => {
    recordAction({ type: "delete", expense });
    setExpenses((prev) => prev.filter((e) => e._id !== expense._id));
  };

  const handleEdit = (prev: Expense, updated: Expense) => {
    recordAction({ type: "edit", expense: updated, prev });
    setExpenses((prevList) =>
      prevList.map((e) => (e._id === updated._id ? updated : e))
    );
  };

  const handleUndo = () => {
    setExpenses((prev) => undo(prev));
    setForceUpdate((x) => x + 1);
  };

  const handleRedo = () => {
    setExpenses((prev) => redo(prev));
    setForceUpdate((x) => x + 1);
  };

  const summary = dashboardSummary(expenses);
  const stats = analytics(expenses);

  return (
    <div>
      <h1>Expense Dashboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h2>Summary</h2>
        <p>Balance: {summary.balance}</p>
        <h3>By Category</h3>
        <ul>
          {Array.from(summary.byCategory.entries()).map(([cat, amt]) => (
            <li key={cat}>
              {cat}: {amt}
            </li>
          ))}
        </ul>
        <h3>By Month</h3>
        <ul>
          {Array.from(summary.byMonth.entries()).map(([month, amt]) => (
            <li key={month}>
              {month}: {amt}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h2>Analytics</h2>
        {stats.biggestExpense && (
          <p>
            Biggest Expense: {stats.biggestExpense.category} -{" "}
            {stats.biggestExpense.amount}
          </p>
        )}
        {stats.topCategory.category && (
          <p>
            Top Category: {stats.topCategory.category} (
            {stats.topCategory.amount})
          </p>
        )}
        {stats.averageMonthly && (
          <p>Average Monthly Spending: {stats.averageMonthly.toFixed(2)}</p>
        )}
      </div>

      <ExpenseList
        expenses={expenses}
        onDelete={(expensesId) => handleDelete(expensesId)}
        onEdit={(expenseid) => handleDelete(expenseid)}
      />
    </div>
  );
}
