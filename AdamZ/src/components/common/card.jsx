const Card = () => {
  return (
    <div className="card mb-3 container" style={{ "max-width": "540px" }}>
      <div className="row g-0">
        <div className="col-md-4 my-2" >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNq5vBOjdm11PWEvk1RZrENWfK4l2zqObBfA&usqp=CAU" className="img-fluid rounded-start h-100"  alt="teacher" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
