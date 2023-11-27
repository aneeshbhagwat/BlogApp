import { useForm } from "react-hook-form";

const useForm = (onSubmit, initialValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
  };
};

export default useForm;
