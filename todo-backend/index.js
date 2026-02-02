const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, title: "sandeep", completed: false },
  { id: 2, title: "Gangadhar", completed: true },
  { id: 3, title: "siva", completed: false },
  { id: 4, title: "krishna", completed: false },
];

// GET todos (pagination + search)
app.get("/todos", (req, res) => {
  let { _page = 1, _limit = 5, title_like } = req.query;

  let filteredTodos = todos;

  if (title_like) {
    filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(title_like.toLowerCase()),
    );
  }

  const start = (_page - 1) * _limit;
  const end = start + Number(_limit);

  res.set("X-Total-Count", filteredTodos.length);
  res.json(filteredTodos.slice(start, end));
});

// GET by id
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  res.json(todo);
});

// POST
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    ...req.body,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT
app.put("/todos/:id", (req, res) => {
  todos = todos.map((todo) =>
    todo.id == req.params.id ? { ...todo, ...req.body } : todo,
  );
  res.json({ message: "Updated successfully" });
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id != req.params.id);
  res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
