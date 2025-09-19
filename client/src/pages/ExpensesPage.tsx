import React, { useState } from "react";
import { redo, undo, recordAction } from "../components/utils/undo,redo";
import { dashboardSummary } from "../components/utils/dashboard";
import { analytics } from "../components/utils/analytics";

export interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Calculate dashboard and analytics
  const summary = dashboardSummary(expenses);
  const stats = analytics(expenses);

  // Add new expense
  const handleAdd = () => {
    if (!amount || !category || !date) return;

    const newExpense: Expense = {
      _id: Date.now().toString(),
      amount: Number(amount),
      category,
      date,
    };

    // Record the action before updating state
    recordAction({ type: "add", expense: newExpense });

    setExpenses((prev) => [...prev, newExpense]);
    resetForm();
  };

  // Start editing - store the original expense for undo
  const handleEditStart = (expense: Expense) => {
    setEditingId(expense._id);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
  };

  // Save edited expense
  const handleEditSave = () => {
    if (!editingId) return;

    const originalExpense = expenses.find((exp) => exp._id === editingId);
    if (!originalExpense) return;

    const updatedExpense: Expense = {
      _id: editingId,
      amount: Number(amount),
      category,
      date,
    };

    // Record the action before updating state
    recordAction({
      type: "edit",
      expense: updatedExpense,
      prev: originalExpense,
    });

    setExpenses((prev) =>
      prev.map((exp) => (exp._id === editingId ? updatedExpense : exp))
    );

    resetForm();
    setEditingId(null);
  };

  // Delete expense
  const handleDelete = (id: string) => {
    const expenseToDelete = expenses.find((exp) => exp._id === id);
    if (!expenseToDelete) return;

    // Record the action before updating state
    recordAction({ type: "delete", expense: expenseToDelete });

    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

  // Reset form inputs
  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleUndo = async () => {
    try {
      const updatedExpenses = await undo(expenses);
      setExpenses(updatedExpenses);
      console.log("Undo successful");
    } catch (error) {
      console.error("Failed to undo", error);
      alert("Undo failed. Please check the console for details.");
    }
  };

  const handleRedo = async () => {
    try {
      const updatedExpenses = await redo(expenses);
      setExpenses(updatedExpenses);
      console.log("Redo successful");
    } catch (error) {
      console.error("Failed to redo", error);
      alert("Redo failed. Please check the console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Expense Tracker</h2>

      {/* Dashboard Summary */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",

          borderRadius: "8px",
        }}
      >
        <h3>Dashboard Summary</h3>
        <p>
          <strong>Balance:</strong> ${summary.balance}
        </p>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <h4>By Category</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Array.from(summary.byCategory.entries()).map(([cat, amt]) => (
                <li key={cat} style={{ marginBottom: "5px" }}>
                  <strong>{cat}:</strong> ${amt}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>By Month</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Array.from(summary.byMonth.entries()).map(([month, amt]) => (
                <li key={month} style={{ marginBottom: "5px" }}>
                  <strong>{month}:</strong> ${amt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h3>Analytics</h3>
        {stats.biggestExpense && (
          <p>
            <strong>Biggest Expense:</strong> {stats.biggestExpense.category} -
            ${stats.biggestExpense.amount}
          </p>
        )}
        {stats.topCategory.category && (
          <p>
            <strong>Top Category:</strong> {stats.topCategory.category} ($
            {stats.topCategory.amount})
          </p>
        )}
        {stats.averageMonthly > 0 && (
          <p>
            <strong>Average Monthly Spending:</strong> $
            {stats.averageMonthly.toFixed(2)}
          </p>
        )}
      </div>

      {/* Form */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>{editingId ? "Edit Expense" : "Add New Expense"}</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "end",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Category
            </label>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "8px", width: "120px" }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Amount
            </label>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: "8px", width: "120px" }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: "8px" }}
            />
          </div>

          {editingId ? (
            <button
              onClick={handleEditSave}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                height: "fit-content",
              }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleAdd}
              style={{
                padding: "8px 16px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                height: "fit-content",
              }}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Undo/Redo Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={handleUndo}
          style={{
            padding: "8px 16px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          style={{
            padding: "8px 16px",
            backgroundColor: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Redo
        </button>
      </div>

      {/* Expense List */}
      <div>
        <h3>All Expenses ({expenses.length})</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet. Add your first expense above!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {expenses.map((expense) => (
              <li
                key={expense._id}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{expense.category}</strong> - ${expense.amount} -{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEditStart(expense)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#FFC107",
                      color: "black",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#F44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
