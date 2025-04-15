import React, { useState } from 'react';
import './TodoCard.css';

function TodoCard({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleUpdate = () => {
    if (updatedText.trim()) {
      onUpdate(todo.id, updatedText);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-card ${todo.done ? 'done' : ''}`}>
      {/* 左邊勾選框 */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id, todo.done)}
        className="checkbox"
      />

      {isEditing ? (
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUpdate();
          }}
          className="edit-input"
        />
      ) : (
        <p onClick={() => onToggle(todo.id, todo.done)}>{todo.text}</p>
      )}

      <div className="actions">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? '完成' : '編輯'}
        </button>
        <button onClick={() => onDelete(todo.id)}>刪除</button>
      </div>
    </div>
  );
}

export default TodoCard;
