import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [fullData, setFullData] = useState([]);
  const [sid, setSid] = useState(null);
  const [sid2, setSid2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/students")
      .then((res) => setFullData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //insert
  const creteData = (e) => {
    e.preventDefault();
    let patchData = {
      mark: 400,
      name: "gamer",
      age: 22,
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
      mark: 700,
    };
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
    <div className="App">
      <div className="border">
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
                    className="bg-danger shadow border-0"
                  >
                    Delete
                  </Button>
                  <ToastContainer />
                </td>
                <td>
                  <Button
                    onClick={() => handleUpdate(student._id)}
                    className="bg-warning border-0 shadow"
                  >
                    Update
                  </Button>
                  <ToastContainer />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Row>
        <Button
          onClick={(e) => creteData(e)}
          className="bg-success border-0 shadow"
        >
          create
        </Button>
        <ToastContainer />
      </Row>
      {/* 
      <input
        type="text"
        placeholder="Enter"
        onChange={(e) => setSid(e.target.value)}
      ></input>
      <button onClick={handleData}>submit</button>
      {sid2 && <label>{sid2}</label>} */}
    </div>
  );
}

export default App;
