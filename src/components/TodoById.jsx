import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoById } from '../store/todoSlice';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../styles/TodoById.css'; // Make sure to create this CSS file

const TodoById = () => {
  const dispatch = useDispatch();
  const [todoId, setTodoId] = useState('');
  const selectedTodo = useSelector(state => state.todo.selectedTodo);
  const loading = useSelector(state => state.todo.loading);
  const error = useSelector(state => state.todo.error);

  const handleFetchTodo = () => {
    if (todoId) {
      dispatch(fetchTodoById(todoId));
    }
  };

  return (
    <Container className="todo-by-id-container">
      <Row className="justify-content-center todoId">
        <Col xs={12} md={8} lg={6} className="todo-by-id-form-wrapper">
          <div className="text-center mb-4">
            <h1 className="title">Fetch Todo by ID</h1>
          </div>
          <Form.Group controlId="todoId">
            <Form.Label className="form-label">Enter Todo ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Todo ID"
              value={todoId}
              onChange={(e) => setTodoId(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Button onClick={handleFetchTodo} className="btn-primary mt-3">
            Fetch Todo
          </Button>
          {loading === 'loading' && <div className="spinner-border mt-3" role="status"></div>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {selectedTodo && (
            <div className="todo-details mt-4">
              <h3>Todo Details</h3>
              <p>ID: {selectedTodo.id}</p>
              <p>Text: {selectedTodo.text}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TodoById;
