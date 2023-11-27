import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./BlogForm.module.css";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const BlogForm = ({ addBlog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addBlog(data);
    console.log("Blog post created successfully");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
      <div className={styles["form-content"]}>
        <div>
          <label className={styles["form-label"]}>Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`${styles["form-control"]} ${
              errors.title ? styles["is-invalid"] : ""
            }`}
          />
          <p className={styles["invalid-feedback"]}>{errors.title?.message}</p>
        </div>
        <div>
          <label className={styles["form-label"]}>Body</label>
          <textarea
            {...register("body", { required: "Description is required" })}
            className={`${styles["form-control"]} ${
              errors.body ? styles["is-invalid"] : ""
            }`}
          />
          <p className={styles["invalid-feedback"]}>{errors.body?.message}</p>
        </div>
        <div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
