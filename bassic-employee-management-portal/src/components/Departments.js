import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { AddDepartmentModal } from "./AddDepartmentModal";
import { Button, ButtonToolbar } from "react-bootstrap";
import { EditDepModal } from "./EditDepModal";
import circlePlus from "../assets/circlePlus.svg";
import penSolid from "../assets/penSolid.svg";
import trashSolid from "../assets/trashSolid.svg";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: [],
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
    fetch("https://localhost:44323/api/department/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          deps: data,
        });
      });

    // https://localhost:44323/api/department
    //DAMI DATA
    // this.setState({
    //     deps:[
    //         {"DepartmentID":1,"DepartmentName":"IT"},
    //         {"DepartmentID":2,"DepartmentName":"SUPPORT"},
    //     ]
    // })
  }

  deleteDep(depid) {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch("https://localhost:44323/api/department/" + depid, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { deps, depid, depName } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <>
        <div className="dep-custom">
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {deps.map((dep) => (
                <tr key={dep.DepartmentID}>
                  <td>{dep.DepartmentID}</td>
                  <td>{dep.DepartmentName}</td>
                  <td>
                    <ButtonToolbar>
                      <Button
                        className="edit-button"
                        size="sm"
                        variant="success"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            depid: dep.DepartmentID,
                            depName: dep.DepartmentName,
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
                        size="sm"
                        className="delete-button"
                        variant="danger"
                        onClick={() => this.deleteDep(dep.DepartmentID)}
                      >
                        <img
                          src={trashSolid}
                          className="delete-button-c"
                          alt="delete"
                        />
                      </Button>
                      <EditDepModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        depid={depid}
                        depName={depName}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonToolbar >
            <Button
              className="add-button "
              variant="outline-secondary"
              onClick={() =>
                this.setState({
                  addModalShow: true,
                })
              }
            >
              Add
              <img src={circlePlus} className="add-button-c" alt="add" />
            </Button>
          </ButtonToolbar>
          <AddDepartmentModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </div>
      </>
    );
  }
}
