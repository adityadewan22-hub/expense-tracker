import React, { useState } from "react";
import { redo, undo, recordAction } from "../components/utils/undo,redo";
import { dashboardSummary } from "../components/utils/dashboard";
import { analytics } from "../components/utils/analytics";
import {
  Button,
  Box,
  Container,
  Heading,
  Text,
  Input,
  Stack,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";

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

  const summary = dashboardSummary(expenses);
  const stats = analytics(expenses);

  const handleAdd = () => {
    if (!amount || !category || !date) return;

    const newExpense: Expense = {
      _id: Date.now().toString(),
      amount: Number(amount),
      category,
      date,
    };

    recordAction({ type: "add", expense: newExpense });

    setExpenses((prev) => [...prev, newExpense]);
    resetForm();
  };

  const handleEditStart = (expense: Expense) => {
    setEditingId(expense._id);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
  };

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

  const handleDelete = (id: string) => {
    const expenseToDelete = expenses.find((exp) => exp._id === id);
    if (!expenseToDelete) return;

    recordAction({ type: "delete", expense: expenseToDelete });

    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

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
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.50, teal.50)"
      position="relative"
    >
      <Box position="absolute" inset={0} bg="gray" backdropFilter="blur(6px)" />
      <Container maxW="6xl" position="relative" zIndex={1} py={10}>
        <Heading mb={8} textAlign="center" color="teal.700">
          💰 Expense Tracker
        </Heading>

        <Card.Root shadow="md" borderRadius="xl" mb={6}>
          <Card.Header>
            <Heading size="md">Dashboard Summary</Heading>
          </Card.Header>
          <Card.Body>
            <Text mb={4}>
              <strong>Balance:</strong> ${summary.balance}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }}>
              <Box>
                <Heading size="sm" mb={2}>
                  By Category
                </Heading>
                {Array.from(summary.byCategory.entries()).map(([cat, amt]) => (
                  <Text key={cat}>
                    <strong>{cat}:</strong> ${amt}
                  </Text>
                ))}
              </Box>
              <Box>
                <Heading size="sm" mb={2}>
                  By Month
                </Heading>
                {Array.from(summary.byMonth.entries()).map(([month, amt]) => (
                  <Text key={month}>
                    <strong>{month}:</strong> ${amt}
                  </Text>
                ))}
              </Box>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        <Card.Root shadow="md" borderRadius="xl" mb={6}>
          <Card.Header>
            <Heading size="md">Analytics</Heading>
          </Card.Header>
          <Card.Body>
            {stats.biggestExpense && (
              <Text>
                <strong>Biggest Expense:</strong>{" "}
                {stats.biggestExpense.category} - ${stats.biggestExpense.amount}
              </Text>
            )}
            {stats.topCategory.category && (
              <Text>
                <strong>Top Category:</strong> {stats.topCategory.category} ($
                {stats.topCategory.amount})
              </Text>
            )}
            {stats.averageMonthly > 0 && (
              <Text>
                <strong>Average Monthly Spending:</strong> $
                {stats.averageMonthly.toFixed(2)}
              </Text>
            )}
          </Card.Body>
        </Card.Root>

        <Card.Root shadow="md" borderRadius="xl" mb={6}>
          <Card.Header>
            <Heading size="md">
              {editingId ? "Edit Expense" : "Add New Expense"}
            </Heading>
          </Card.Header>
          <Card.Body>
            <Stack direction={{ base: "column", md: "row" }} gap={4}>
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {editingId ? (
                <Button colorPalette="green" onClick={handleEditSave}>
                  Save
                </Button>
              ) : (
                <Button colorPalette="teal" onClick={handleAdd}>
                  Add
                </Button>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>

        <Stack direction="row" gap={4} mb={6}>
          <Button
            colorPalette="orange"
            onClick={handleUndo}
            color="black"
            _dark={{ color: "white" }}
          >
            Undo
          </Button>
          <Button colorPalette="purple" onClick={handleRedo} color={"black"}>
            Redo
          </Button>
        </Stack>

        <Card.Root shadow="md" borderRadius="xl">
          <Card.Header>
            <Heading size="md">All Expenses ({expenses.length})</Heading>
          </Card.Header>
          <Card.Body>
            {expenses.length === 0 ? (
              <Text>No expenses yet. Add your first expense above!</Text>
            ) : (
              <Stack gap={3}>
                {expenses.map((expense) => (
                  <Box
                    key={expense._id}
                    p={3}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>
                      <strong>{expense.category}</strong> - ${expense.amount} -{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </Text>
                    <Stack direction="row" gap={2}>
                      <Button
                        size="sm"
                        colorPalette="yellow"
                        onClick={() => handleEditStart(expense)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorPalette="red"
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
};

export default ExpenseList;
