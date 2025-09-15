import React from "react";

export interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
}
type ExpenseListProps = {
  expenses: Expense[];
  onEdit: (_id: string, updated: Partial<Expense>) => void;
  onDelete: (_id: string) => void;
};

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  if (expenses.length === 0) {
    return <p>No expenses yet. Add your first one!</p>;
  }

  return (
    <div>
      <h2>All Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} style={{ marginBottom: "0.5rem" }}>
            <strong>{expense.category}</strong> - ₹{expense.amount} on{" "}
            {expense.date}
            <div
              style={{
                display: "inline-flex",
                gap: "0.5rem",
                marginLeft: "1rem",
              }}
            >
              <button
                onClick={() =>
                  onEdit(expense._id, {
                    category:
                      prompt("New category", expense.category) ||
                      expense.category,
                    amount:
                      Number(prompt("New amount", expense.amount.toString())) ||
                      expense.amount,
                    date: prompt("New date", expense.date) || expense.date,
                  })
                }
              >
                Edit
              </button>
              <button onClick={() => onDelete(expense._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
