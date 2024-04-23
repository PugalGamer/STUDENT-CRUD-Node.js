import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Row, Button, Form, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [fullData, setFullData] = useState([]);
  const [sid, setSid] = useState(null);
  const [sid2, setSid2] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mark, setMark] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/students")
      .then((res) => setFullData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //insert
  const handleSubmit = (e) => {
    e.preventDefault();
    let patchData = {
      name: name,
      age: age,
      mark: mark,
    };
    axios
      .post(`http://localhost:4000/api/students/`, patchData)
      .then((res) => {
        console.log(res.data);
        toast.success("Inserted !", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error !", {
          position: "top-left",
        });
      });
    // Implement update logic here
    console.log("created student data:");
  };

  //delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/students/${id}`)
      .then((res) => {
        toast.success("Deleted !", {
          position: "top-right",
          theme: "dark",
        });
      })
      .catch((err) => console.log(err));

    // Implement delete logic here
    console.log("Deleting student with ID:", id);
  };

  //update
  // console.log(sid2);
  const handleUpdate = (id) => {
    let patchData = {
      name: name,
      age: age,
      mark: mark,
    };
    if (name && age && mark) {
      axios
        .patch(`http://localhost:4000/api/students/${id}`, patchData)
        .then((res) => {
          console.log(res.data);
          toast.success("Updated !", {
            position: "top-right",
            theme: "colored",
          });
        })
        .catch((err) => {
          console.log(err);
          alert("failed");
        });
      // Implement update logic here
      console.log("Updating student with ID:", id);
    } else {
      toast.warning("Please fill all fiedls");
    }
  };

  //get 1 user
  const handleData = () => {
    axios
      .get(`http://localhost:4000/api/students/${sid}`)
      .then((res) => {
        setSid2(res.data);
        alert("success");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-3 h-100">
      <Row className="d-flex justify-content-center">CRUD-APPLICATION</Row>
      <Row className="mt-5">
        <Form className="" onSubmit={handleSubmit}>
          <Row className="">
            <Col sx={3}>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col sx={3}>
              <Form.Control
                required
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col sx={3}>
              <Form.Control
                required
                type="number"
                placeholder="Mark"
                onChange={(e) => setMark(e.target.value)}
              />
            </Col>
            <Col sx={3}>
              <Button type="submit" className="bg-success border-0 shadow ">
                create
              </Button>
              <ToastContainer />{" "}
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="mt-3 p-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Mark</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fullData?.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.mark}</td>
                <td>
                  <Button
                    onClick={() => handleDelete(student._id)}
                    className="bg-danger shadow border-0 "
                    size="sm"
                  >
                    Delete
                  </Button>
                  <ToastContainer />
                </td>
                <td>
                  <Button
                    onClick={() => handleUpdate(student._id)}
                    className="bg-warning border-0 shadow"
                    size="sm"
                  >
                    <i className=""></i>
                    Update
                  </Button>
                  <ToastContainer />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default App;
