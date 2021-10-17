import React, { useEffect, useRef, useState } from 'react';
import TodoList from './components/TodoList';
import './App.css'

import { ITodo } from './types/data';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [])

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        complete: false
      }])
    }
    setValue('');
  }

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if(todo.id !== id) return todo;
      return {
        ...todo,
        complete: !todo.complete
      }
    }))
  }

  const updateTodo = (id: number, updatedTodo: string): void => {
    setTodos(todos.map(todo => {
      if(todo.id !== id) return todo;
      return {
        ...todo,
        title: updatedTodo
      }
    }))
  }


  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <div>
        <input className={`inputField`} value={value} onChange={handleChange} ref={inputRef} />
        <button className={`addButton`} onClick={addTodo}>Add</button>
      </div>
      <TodoList 
        todos={todos}
        deleteTodo={deleteTodo} 
        toggleTodo={toggleTodo} 
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
