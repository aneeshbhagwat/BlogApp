import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap"; // Import Navbar, Nav, and Button from react-bootstrap
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import "bootstrap/dist/css/bootstrap.min.css";
const initialState = { blogs: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      const newBlog = {
        ...action.payload.blog,
        date: new Date().toISOString(),
      };
      return { ...state, blogs: [...state.blogs, newBlog] };
    case "DELETE_BLOG":
      return {
        ...state,
        blogs: state.blogs.filter((_, index) => index !== action.payload.index),
      };
    case "UPDATE_BLOG":
      const updatedBlogs = state.blogs.map((blog, index) =>
        index === action.payload.index
          ? { ...blog, body: action.payload.updatedBlog }
          : blog
      );
      return { ...state, blogs: updatedBlogs };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBlog = (blog) => {
    dispatch({ type: "ADD_BLOG", payload: { blog } });
  };

  return (
    <Router>
      {/* Use Bootstrap Navbar */}
      <Navbar bg="dark" expand="lg">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            <Button variant="outline-secondary">My Blog's</Button>{" "}
          </Link>
        </Nav>
        <Nav className="ml-auto">
          <Link to="/add" className="nav-link">
            <Button variant="primary">Add New Post</Button>
          </Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={<BlogList blogs={state.blogs} dispatch={dispatch} />}
        />
        <Route path="/add" element={<BlogForm addBlog={addBlog} />} />
      </Routes>
    </Router>
  );
};

export default App;
