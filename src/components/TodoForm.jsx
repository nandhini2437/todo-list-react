import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo({
      text
    });
    setText('');
  };

  return (
    <div className="todo-form-container">
      <Form onSubmit={handleSubmit} className="todo-form">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 w-100">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default TodoForm;
