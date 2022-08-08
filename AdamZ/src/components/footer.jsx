import "../css/main.css";
const Footer = () => {
  return (
    <div className="footer">
      <span>
        Real<i className="bi bi-geo-fill"></i>App
      </span>
      <span className="mx-1">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </div>
  );
};

export default Footer;
