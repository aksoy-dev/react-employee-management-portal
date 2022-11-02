import React, { Component } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import SnackBar from "@material-ui/core/SnackBar";
import IconButton from "@material-ui/core/IconButton";
import userPlus from "../assets/userPlus.svg";

export class AddEmpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: [],
      snackbarOpen: false,
      snackbarMSG: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:44323/api/department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          deps: data,
        });
      });
  }

  snackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    fetch("https://localhost:44323/api/employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeID: null,
        EmployeeName: e.target.EmployeeName.value,
        Department: e.target.Department.value,
        MailId: e.target.MailId.value,
        DOJ: e.target.DOJ.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            snackbarOpen: true,
            snackbarMSG: result,
          });
        },
        (error) => {
          this.setState({
            snackbarOpen: true,
            snackbarMSG: "Failed",
          });
        }
      );
  }

  render() {
    return (
      <>
        <SnackBar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarMSG}</span>}
          action={[
            <IconButton
              ket="close"
              aria-label="close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="EmployeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Employee Name"
                      name="EmployeeName"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select">
                      {this.state.deps.map((dep) => (
                        <option key={dep.DepartmentID}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="MailId">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Mail"
                      name="MailId"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="DOJ">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      name="DOJ"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Button size="sm" variant="outline-success" type="submit">
                      Ekle
                      <img src={userPlus} className="add-button-c" alt="add" />
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={this.props.onHide}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
