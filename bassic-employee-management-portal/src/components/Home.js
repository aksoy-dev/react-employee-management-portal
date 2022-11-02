import React, { Component } from "react";
import employeePortal from "../assets/employeePortal.png";
export class Home extends Component {
  render() {
    return (
      <>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={employeePortal} className="employee-portal" alt="logo" />
        </a>
      </>
    );
  }
}
