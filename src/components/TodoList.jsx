import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo } from '../store/todoSlice';
import { setUsername } from '../store/userSlice';
import { Button, ListGroup, Spinner, Alert, Form, Container, Row, Col } from 'react-bootstrap';
import TodoForm from './TodoForm';
import { useNavigate } from 'react-router-dom';
import '../styles/TodoList.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector(state => state.todo.data);
  const loading = useSelector(state => state.todo.loading);
  const error = useSelector(state => state.todo.error);
  const username = useSelector(state => state.user.username);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    if (username) {
      dispatch(fetchTodos(username));
    } else {
      navigate('/login');
    }
  }, [dispatch, username, navigate]);

  const handleAddTodo = (newTodo) => {
    dispatch(addTodo({
      ...newTodo,
      username
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setUsername(''));
    navigate('/login');
  };

  const filteredTodos = todos.filter(todo => searchId === '' || todo.id.toString() === searchId);

  return (
    <Container className="todo-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="todo-form-wrapper">
          <div className="text-center mb-4">
            <h1 className="title">Todo List</h1>
          </div>
          <TodoForm onAddTodo={handleAddTodo} />
          <Form.Group controlId="searchId" className="search-form-group mb-4">
            <Form.Label className="search-label">Search by ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter todo ID to search"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </Form.Group>
          <div className="todo-list-content shadow p-3 mb-4">
            <ListGroup>
              {filteredTodos.map(todo => (
                <ListGroup.Item key={todo.id} className="d-flex justify-content-between">
                  <span>{todo.text}</span>
                  <span>{todo.id}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          {loading === 'loading' && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center mt-4">
            <Button onClick={handleLogout} className="w-100 mt-3">
              Log out
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
