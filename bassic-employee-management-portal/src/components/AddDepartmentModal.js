import React, { Component } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import SnackBar from "@material-ui/core/SnackBar";
import IconButton from "@material-ui/core/IconButton";
import circlePlus from "../assets/circlePlus.svg";

export class AddDepartmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      snackbarMSG: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    fetch("https://localhost:44323/api/department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentID: null,
        DepartmentName: e.target.DepartmentName.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //   alert(result);
          this.setState({
            snackbarOpen: true,
            snackbarMSG: result,
          });
        },
        (error) => {
          //   alert("Başarısız")
          this.setState({
            snackbarOpen: true,
            snackbarMSG: "Failed",
          });
        }
      );

    // alert(e.target.DepartmentName.value)
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
              Add Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Department Name"
                      name="DepartmentName"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Button size="sm" variant="outline-success" type="submit">
                      <img
                        src={circlePlus}
                        className="add-button-alt"
                        alt="add"
                      />
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
