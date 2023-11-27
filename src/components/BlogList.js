import React, { useState } from "react";
import Pagination from "./Pagination";
import styles from "./BlogList.module.css";

const BlogList = ({ blogs, dispatch }) => {
  const [updatedBlog, setUpdatedBlog] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = blogs.length > 0 ? blogs[indexOfFirstPost] : null;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = (index) => {
    setUpdateMode(true);
    setCurrentIndex(index);
    setUpdatedBlog(blogs[index].body);
  };

  const handleUpdateConfirm = () => {
    if (currentIndex !== null) {
      const confirmed = window.confirm("Do you want to update this blog?");
      if (confirmed) {
        dispatch({
          type: "UPDATE_BLOG",
          payload: { index: currentIndex, updatedBlog },
        });
        setUpdatedBlog("");
        setUpdateMode(false);
        setCurrentIndex(null);
      }
    }
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("Do you want to delete this blog?");
    if (confirmed) {
      dispatch({ type: "DELETE_BLOG", payload: { index } });
    }
  };

  return (
    <div className={`container ${styles.FormContainer}`}>
      <h2 className="text-center mt-4">Posts</h2>
      {currentPost && (
        <div
          key={indexOfFirstPost}
          className={`Post ${styles.Post} text-center my-4`}
        >
          <h3>{currentPost.title}</h3>
          <p>{currentPost.body}</p>
          <p>Date: {new Date(currentPost.date).toLocaleDateString()}</p>
          {updateMode && currentIndex === indexOfFirstPost && (
            <div>
              <textarea
                value={updatedBlog}
                onChange={(e) => setUpdatedBlog(e.target.value)}
                className="form-control"
              />
              <button
                className="btn btn-success mt-2"
                onClick={handleUpdateConfirm}
              >
                Confirm Update
              </button>
            </div>
          )}
          {!updateMode && (
            <>
              <button
                className="btn btn-outline-success"
                onClick={() => handleUpdate(indexOfFirstPost)}
              >
                Update
              </button>{" "}
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(indexOfFirstPost)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
      <Pagination
        totalPages={Math.ceil(blogs.length / postsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogList;
