import React, { useEffect, useRef } from "react";

import classes from "./Cockpit.module.css";

function Cockpit(props) {
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log("Cockpit.js useEffect");
    // http request

    toggleBtnRef.current.click();

    return () => {
      console.log("cockpit.js useeffect return cleanup");
    };
  }, []);

  // useEffect(() => {
  //   console.log("Cockpit.js 2nd useEffect");
  //   // http request

  //   setTimeout(() => alert("saved data"), 1000);
  //   return () => {
  //     console.log("cockpit.js 2nd useeffect return cleanup");
  //   };
  // });

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
    </div>
  );
}

export default React.memo(Cockpit);
