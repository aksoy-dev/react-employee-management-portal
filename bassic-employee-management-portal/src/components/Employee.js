import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { AddEmpModal } from "./AddEmpModal";
import { Button, ButtonToolbar } from "react-bootstrap";
import { EditEmpModal } from "./EditEmpModal";
import penSolid from "../assets/penSolid.svg";
import trashSolid from "../assets/trashSolid.svg";
import userPlus from "../assets/userPlus.svg";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emps: [],
      addModalShow: false,
      editModalShow: false,
    };
  }

  componentDidMount() {
    this.refleshlist();
  }
  //anlık veri güncelleme
  componentDidUpdate() {
    this.refleshlist();
  }

  refleshlist() {
    fetch("https://localhost:44323/api/employee/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          emps: data,
        });
      });
  }

  deleteEmp(empid) {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch("https://localhost:44323/api/employee/" + empid, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { emps, empid, empName, depmt, doj, mailid } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <>
        <div className="dep-custom">
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Mail</th>
                <th>Date</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {emps.map((emp) => (
                <tr key={emp.DepartmentID}>
                  <td>{emp.EmployeeID}</td>
                  <td>{emp.EmployeeName}</td>
                  <td>{emp.Department}</td>
                  <td>{emp.MailId}</td>
                  <td>{emp.DOJ}</td>

                  <td>
                    <ButtonToolbar>
                      <Button
                        className="edit-button"
                        size="sm"
                        variant="success"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            empid: emp.EmployeeID,
                            empName: emp.EmployeeName,
                            depmt: emp.Department,
                            doj: emp.DOJ,
                            mailid: emp.MailId,
                          })
                        }
                      >
                        <img
                          src={penSolid}
                          className="edit-button-c"
                          alt="edit"
                        />
                      </Button>

                      <Button
                        className="delete-button"
                        size="sm"
                        variant="danger"
                        onClick={() => this.deleteEmp(emp.EmployeeID)}
                      >
                        <img
                          src={trashSolid}
                          className="delete-button-c"
                          alt="delete"
                        />
                      </Button>

                      <EditEmpModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        empid={empid}
                        empName={empName}
                        depmt={depmt}
                        doj={doj}
                        mailid={mailid}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonToolbar>
            <Button
              className="add-button"
              variant="outline-secondary"
              onClick={() =>
                this.setState({
                  addModalShow: true,
                })
              }
            >
              Add <img src={userPlus} className="add-button-c" alt="add" />
            </Button>
          </ButtonToolbar>
          <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
        </div>
      </>
    );
  }
}
