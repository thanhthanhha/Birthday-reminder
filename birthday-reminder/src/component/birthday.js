import { Helmet } from "react-helmet";
import peopledata from "../data.json";
import React from "react";
import WebWorker from "../worker";
import WebWorkerEnabler from "../webWorkerEnabler";
const workerInstance = new WebWorkerEnabler(WebWorker);
const Birthday = () => {
  return (
    <>
      <h2>Birthday Reminder</h2>
      <Helmet>
        <title>Birthday Reminder</title>
        <link rel="icon" href="../icon.png" />
      </Helmet>
      <Person></Person>
    </>
  );
};

const PeopleList = () => {
  //const People = JSON.parse(peopledata);
  return (
    <>
      {peopledata.people.map((person) => {
        return <Person key={person.id} {...person}></Person>;
      })}
    </>
  );
};
class Person extends React.Component {
  componentDidMount() {
    workerInstance.addEventListener(
      "message",
      (e) => {
        console.log("Received response:");
        console.log(e.data);
      },
      false
    );
  }
  constructor(props) {
    super(props);
    this.state = peopledata;
  }
  render() {
    return (
      <>
        {this.state.people.map((item) => (
          <React.Fragment key={item.id}>
            <div className="container">
              <img src={item.img} width="50" />
              <h4>{item.name}</h4>
              <span>{item.birthday}</span>
              <button onClick={workerInstance.postMessage("bar")}>
                click me
              </button>
              <span></span>
            </div>
          </React.Fragment>
        ))}
      </>
    );
  }
}
export default Birthday;
