import React, { useState, useEffect } from 'react';
import AddTodo from './Component/AddTodo';
import TodoList from './Component/TodoList';
import Filter from './Component/Filter';
import './App.css';

const API_URL = 'https://dummyjson.com/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Fetch todos from the API
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data.todos); // Set API todos
    };
    fetchTodos();
  }, []);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), todo: text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Filter todos
  const filteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'pending':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todo-app">
      <h1> Dynamic To-Do List Application in React.</h1>
      <AddTodo  addTodo={addTodo} />
      <Filter setFilter={setFilter} />
      <TodoList 
        todos={filteredTodos()} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
};

export default App;
