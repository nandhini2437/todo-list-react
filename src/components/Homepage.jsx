import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TodoById from './TodoById';
import TodoList from './TodoList';
import '../styles/Homepage.css'; 

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="container mt-4">
        <Tab.Container id="left-tabs-example" defaultActiveKey="todo-list">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="todo-list">Todo List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="todo-by-id">Todo by ID</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="todo-list">
              <TodoList />
            </Tab.Pane>
            <Tab.Pane eventKey="todo-by-id">
              <TodoById />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default Homepage;
