import { Helmet } from "react-helmet";
import peopledata from "../data.json";
import React from "react";
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
    this.state = peopledata;
    this.dismissNotif = this.dismissNotif.bind(this);
  }
  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({
        people: this.state.people.filter((item) => {
          let date = new Date(item.birthday);
          let now = new Date();
          if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth()
          ) {
            return true;
          }
          return false;
        }),
      });
    }, 1000);
    this.setState({ intervalId: intervalId });
  }
  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }
  dismissNotif = (userId) => {
    this.setState((prevState) => {
      let people = prevState.people.filter((item) => item.id != userId);
      return { people };
    });
  };
  render() {
    return (
      <>
        <div className="bigContain">
          <div>
            {this.state.people.map((item) => (
              <React.Fragment key={item.id}>
                <div className="container">
                  <img src={item.img} width="50" className="avatar" />
                  <span>{item.name}</span>
                  <span>{item.birthday}</span>
                  <button
                    onClick={() => {
                      this.dismissNotif(item.id);
                    }}
                  >
                    DISMISS
                  </button>
                  <span></span>
                </div>
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
  }
}
export default Birthday;
