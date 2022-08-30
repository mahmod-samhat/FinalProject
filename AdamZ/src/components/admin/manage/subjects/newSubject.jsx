import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../../../utils/formikValidationUsingJoi";
import Input from "../../../common/input";
import { useState } from "react";
import { createSubject } from "../../../../services/subjectServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCounter } from "../../../../context/counterContext";

const NewSubject = () => {
  const { increaseSubjectsCounter } = useCounter();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
    },
    validate: formikValidateUsingJoi({
      name: Joi.string().max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        const subject = await createSubject(values);
        toast.info("הכיתה נרשמה בהצלחה 👏");
        increaseSubjectsCounter()
        navigate(-1);
      } catch ({ response }) {
        if (response.status === 400) setError(response.data.message);
      }
    },
  });
  return (
    <div className="container">
      <div className="mx-5">
        <form onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger fs-5">{error}</div>}
          <div className="d-flex justify-content-center align-items-center bg-light my-3">
            <Input
              type="text"
              label="שם"
              placeholder="שם"
              width="20px"
              {...form.getFieldProps("name")}
              error={form.touched.name && form.errors.name}
            />
            <div className="form-floating flex-fill">
              <textarea
                className="form-control h-50"
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">הערות</label>
            </div>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-info btn-lg"
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
              }}
            >
              שמור
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewSubject;
