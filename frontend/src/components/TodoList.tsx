import React from 'react';
import { ITodo } from '../types/data';
import Todo from './Todo';

interface ITodoListProps {
    todos: ITodo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, updatedTodo: string) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const { todos, toggleTodo, deleteTodo, updateTodo } = props;
    return (
        <div>
            {
                todos.map(todo =>
                    <Todo
                        key={todo.id}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                        todo={todo}
                    />)
            }
        </div>
    );
}

export default TodoList;
