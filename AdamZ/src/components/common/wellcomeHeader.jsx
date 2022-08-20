const WellcomeHeader = () => {
  return (
    <div className="card bg-dark text-white h-100 m-4">
      <img
        src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="card-img"
        alt="..."
        height="250px"
      />
      <div className="card-img-overlay">
        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
          <span className="card-title position-absolute top-0 end-0 p-2">
            שלום <span className="fw-bold fs-5 ">מחמוד סמחאת</span>, ברוך הבא
            בגרסה החדשה של מערכת אדאמז
          </span>
          <h3 className="card-text">ברוך הבא במערכת אדאמז</h3>
          <span>מאחל לך עבודה נעימה תודה שבחרת במערכת ,תהנו בכלים החדשים</span>
        </div>
      </div>
    </div>
  );
};
export default WellcomeHeader;
