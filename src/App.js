import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import TodoCard from './TodoCard';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ 讀取代辦失敗：', error.message);
    } else {
      setTodos(data);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const { error } = await supabase.from('todos').insert([
      { text: newTodo, done: false }
    ]);

    if (error) {
      console.error('❌ 新增代辦失敗：', error.message, error.details, error.hint);
    } else {
      setNewTodo('');
      fetchTodos();
    }
  };

  const toggleComplete = async (id, current) => {
    const { error } = await supabase
      .from('todos')
      .update({ done: !current })
      .eq('id', id);

    if (error) {
      console.error('❌ 切換完成狀態失敗：', error.message);
    } else {
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      console.error('❌ 刪除失敗：', error.message);
    } else {
      fetchTodos();
    }
  };

  const updateTodo = async (id, updatedText) => {
    const { error } = await supabase.from('todos').update({ text: updatedText }).eq('id', id);
    if (error) {
      console.error('❌ 更新失敗：', error.message);
    } else {
      fetchTodos();
    }
  };

  return (
    <div className="app-container">
      <h1>📋 我的代辦清單</h1>
      <div className="todo-form">
        <input
          type="text"
          value={newTodo}
          placeholder="輸入新的代辦事項..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>新增</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
