import classNames from "classnames";

const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group mx-2">
      <label className="form-labe m-1" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        id={name}
        name={name}
        className={classNames("form-control", "form-control-md", "mb-2", {
          "is-invalid": error,
        })}
      />
      <span className="invalid-feedback ">{error}</span>
    </div>
  );
};
export default Input;
