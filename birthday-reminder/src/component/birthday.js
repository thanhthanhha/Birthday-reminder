import { Helmet } from "react-helmet";
<<<<<<< HEAD
import favicon from '../icon.png'
const Birthday = () => {
    return <> 
    <h2>Birthday Reminder</h2>
    <Helmet>
        <title>Birthday Reminder</title>
            <link rel="icon" type="image/png" href={favicon}/>
    </Helmet>
=======
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
  console.log(peopledata);
  return (
    <>
      {peopledata.people.map((person) => {
        return <Person key={person.id} {...person}></Person>;
      })}
>>>>>>> af362318bfe7d7377ae04d223a9fe167bbc52177
    </>
  );
};
const Person = (props) => {
  const CountDown = (birthday) => {
    const Now = new Date(),
      Bday = new Date(birthday);
    const [text, setText] = React.useState();
    setInterval(() => {
      let distance = Now.getTime() - Bday.getTime();
      let Days = Math.floor(distance / (1000 * 60 * 60 * 24));
      console.log(Days);
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

        setText(
          Days +
            plural +
            Hours +
            " Hours " +
            Mins +
            " Minutes Until Their Birthday!!!!"
        );
      } else {
        setText("Happy Birthday!!!");
      }
    }, 1000 * 60);
    return text;
  };
  return (
    <>
      <img src={props.img} width="50" />
      <h4>{props.name}</h4>
      <span>{props.birthday}</span>

      <span>{CountDown(props.birthday)}</span>
    </>
  );
};
export default Birthday;
