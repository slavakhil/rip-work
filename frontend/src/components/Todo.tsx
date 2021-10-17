import React, { useState } from 'react';
import { ITodo } from '../types/data';
import './styles.css'

interface ITodoItem{
  todo: ITodo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedTodo: string) => void;
}

const Todo: React.FC<ITodoItem> = (props) => {
  const { todo, toggleTodo, deleteTodo, updateTodo } = props;

  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.title)

  const activateEditMode = () => {
    setEditMode(true);
}
  const deactivateEditMode = () => {
    setEditMode(false);
    updateTodo(todo.id, updatedTodo);
}

  const onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedTodo(e.currentTarget.value)
}

  return (
    <div className={`box`}>
      <input type='checkbox' checked={todo.complete} onChange={() => toggleTodo(todo.id)} />
      {!editMode &&
        <span onDoubleClick={activateEditMode}>{todo.title}</span>
      }
      {editMode &&
        <input className={`changeInputField`} onChange={onStatusChange} onBlur={deactivateEditMode} value={updatedTodo}/>
      }
      
      <button className={`deleteButton`} onClick={() => deleteTodo(todo.id)}>x</button>
    </div>
  );
}

export default Todo;
