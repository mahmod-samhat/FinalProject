import { usePromiseTracker } from "react-promise-tracker";
import "../css/loadingSpinner.css";
const LoadingSpinner = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
      {promiseInProgress === true ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : null}
    </div>
  );
};

export default LoadingSpinner;
