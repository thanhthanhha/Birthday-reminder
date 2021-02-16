import { Helmet } from "react-helmet";
import peopledata from "../data.json";
import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring } from "react-spring";
//import WebWorker from "../worker";
//import WebWorkerEnabler from "../webWorkerEnabler";
//const workerInstance = new WebWorkerEnabler(WebWorker);
const Birthday = () => {
  return (
    <>
      <Helmet>
        <title>Birthday Reminder</title>
        <link rel="icon" href="../icon.png" />
      </Helmet>
      <Person></Person>
    </>
  );
};
const PersonList = () => {
  //set State

  const [people, setPeople] = useState(peopledata.people);
  // setPeople((prevState) => {
  //   let newpeople = peopledata.people.filter((item) => {
  //     let date = new Date(item.birthday);
  //     let now = new Date();
  //     if (
  //       date.getDate() === now.getDate() &&
  //       date.getMonth() === now.getMonth()
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return newpeople;
  // });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPeople((prevState) => {
        let newpeople = prevState.filter((item) => {
          let date = new Date(item.birthday);
          let now = new Date();
          if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth()
          ) {
            return true;
          }
          return false;
        });
        return newpeople;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //transition
  const transitions = useTransition(people, (item) => item.id, {
    enter: { transform: "translateX(0rem)", opacity: 1 },
    leave: { transform: "translateX(-20rem)", opacity: 0 },
    config: { duration: 500 },
  });
  console.log(transitions);
  var dismissNotif = (userId) => {
    setPeople((prevState) => {
      let newpeople = prevState.filter((item) => item.id != userId);

      console.log("the prev " + newpeople);
      return newpeople;
    });
  };
  return (
    <>
      <div className="bigContain">
        <div>
          {transitions.map(({ item, key, props }) => (
            <React.Fragment key={item.id}>
              <animated.div className="container" style={props}>
                <img src={item.img} width="50" className="avatar" />
                <span>{item.name}</span>
                <span>{item.birthday}</span>
                <button
                  onClick={() => {
                    dismissNotif(item.id);
                  }}
                >
                  DISMISS
                </button>
                <span></span>
              </animated.div>
            </React.Fragment>
          ))}
        </div>
        <div className="header">
          <div>
            <div>
              Birthday
              <br></br>Reminder
              <span id="red">
                Birthday
                <br></br>Reminder
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
class Person extends React.Component {
  // componentDidMount() {
  //   workerInstance.addEventListener(
  //     "message",
  //     (e) => {
  //       console.log("Received response:");
  //       console.log(e.data);
  //     },
  //     false
  //   );
  // }

  constructor(props) {
    super(props);
  }
  render() {
    return <PersonList></PersonList>;
  }
}
export default Birthday;
