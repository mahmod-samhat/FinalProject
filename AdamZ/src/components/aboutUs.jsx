const AboutUs = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 ">
      <div className="border w-75 bg-light h-75 d-flex">
        <div className="w-50 p-3">
          <div className="divider d-flex align-items-center ">
            <p className="display-5 fw-bold text-center px-3 text-primary">
              <i className="bi bi-stack"></i> AdamZ
            </p>
          </div>
          <div className="text-center">
            <p className="fw-bold">ברוכים הבאים למערכת אדאמז </p>
            מערכת אדאמז היא מערכת חדש עדכנית מיועדת לניול פדגוגי במוסדות החינוך.
            מערכת אדאמז נותנת כלים חדשים לנהל כל הנתונים בבית ספר. אחראית על
            הדפסת וניהול תעודות בקלות. כל המערכת מחוברת מיועדת למורים ומנהלים.
            התנהלות איכותית שימוש ידידותי וחיסכון זמן
          </div>
        </div>
        <div className="w-50 d-flex align-items-center justify-content-center">
          <div>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="paper writing"
            />
          </div>
        </div>
      </div>
      <div className="w-25 bg-primary h-75 py-2">
        <div className="card text-center h-100  ">
          <div className="card-body">
            <div className="d-flex">
              <div>
                <u>
                  <h5 className="card-title fs-3">מערכת אדאמז</h5>
                </u>
                <p className="card-text fw-bold">
                  <span className="badge bg-success">
                    מערכת אדאמז לניהול פדגוגי
                  </span>
                </p>
              </div>
            </div>
          </div>

          <ul className="list-group list-group-flush ">
            <div className="d-flex m-2">
              <i className="bi bi-telephone"></i>
              <p className="card-text">0547509319</p>
            </div>
            <div className="d-flex m-2">
              <i className="bi bi-envelope"></i>
              <p className="card-text">mahmod.samhat@gmail.com</p>
            </div>
            <div className="d-flex m-2">
              <i className="bi bi-geo-alt-fill"></i>
              <p className="card-text">כפר מנדא - רח' זערורה 22א</p>
            </div>
          </ul>
          <div className="card-body fw-bold">פרטים</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
