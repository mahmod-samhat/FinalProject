const Dropdown = ({ items, title, onChange }) => {
  return (
    <div>
      <button
        className="btn dropdown-toggle m-2 text-decoration-underline"
        style={{ color: "white" }}
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {items[0]}
      </button>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {items &&
          items.map((item) => {
            return (
              <li key={item}>
                <button
                  onClick={onChange ? () => onChange(item) : undefined}
                  className="dropdown-item"
                >
                  {item}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Dropdown;
