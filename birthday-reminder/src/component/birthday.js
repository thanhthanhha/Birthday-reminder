import { Helmet } from "react-helmet";
import peopledata from "../data.json";
import React from "react";

const Birthday = () => {
  return (
    <>
      <h2>Birthday Reminder</h2>
      <Helmet>
        <title>Birthday Reminder</title>
        <link rel="icon" href="../icon.png" />
      </Helmet>
      <PeopleList></PeopleList>
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
const Person = (props) => {
  const CountDown = (birthday, name) => {
    let Now = new Date(),
      Bday = new Date(birthday),
      text = "";
    let nowBday = new Date(
        Now.getFullYear() + "-" + Bday.getMonth() + "-" + Bday.getDate()
      ),
      exBday = new Date(
        Now.getFullYear() + 1 + "-" + Bday.getMonth() + "-" + Bday.getDate()
      );
    var distance = nowBday.getTime() - Now.getTime();
    if (distance < 0) {
      distance = exBday.getTime() - Now.getTime();
    }
    setInterval(() => {
      let Days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let Hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let Mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      if (
        Now.getDate() !== Bday.getMonth() &&
        Now.getMonth() !== Bday.getMonth()
      ) {
        let plural;
        if ((Days = 1)) {
          plural = " Days ";
        } else {
          plural = " Day ";
        }

        text =
          Days +
          plural +
          Hours +
          " Hours " +
          Mins +
          " Minutes Until Their Birthday!!!!";
      } else {
        text = "Happy Birthday!!!";
      }
      console.log(distance + " and " + Days + " of " + name);
    }, 1000 * 30);
    return text;
  };
  return (
    <>
      <div className="container">
        <img src={props.img} width="50" />
        <h4>{props.name}</h4>
        <span>{props.birthday}</span>

        <span>{CountDown(props.birthday, props.name)}</span>
      </div>
    </>
  );
};
export default Birthday;
