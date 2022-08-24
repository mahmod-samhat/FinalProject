import { useIdleTimer } from "react-idle-timer";

const IdleTimerContainer = (props) => {
  const handleOnIdle = () => console.log("OnIdle idle");

  useIdleTimer({
    timeout: 4 * 60 * 60 * 1000,
    onIdle: handleOnIdle,
  });
  return <></>;
};

export default IdleTimerContainer;
