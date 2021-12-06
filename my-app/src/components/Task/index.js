import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// import "./style.css";
const URL = "http://localhost:5000";
const Todos = () => {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tasks, settasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const StorgeToken = localStorage.getItem("token");
    setToken(StorgeToken);
    const StorgeRole = localStorage.getItem("role");
    setRole(StorgeRole);
    gettask(StorgeToken);
    // eslint-disable-next-line
  }, []);

  const gettask = async (token) => {
    try {
      const res = await axios.get(`${URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      settasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addtask = async () => {
    try {
      await axios.post(
        `${URL}/task`,
        {
          name: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    gettask(token);
  };

  const updatetask = async (id) => {
    try {
      const { value: updetatasks } = await Swal.fire({
        title: "Updated task",
        input: "text",
        inputPlaceholder: "Input the new task",
        showCancelButton: true,
        confirmButtonColor: "#006d77",
        reverseButtons: true,
      });

      if (updetatasks) {
        await axios.put(
          `${URL}/tasksupdeta/${id}`,
          {
            name: updetatasks,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        gettask(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletetask = async (id) => {
    try {
      await axios.delete(`${URL}/taskdelet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      gettask(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <div className="wrapper">
        {!token ? (
          <h1>
            You are not logeddin yet, so <Link to="/login">login</Link> or <Link to="/signup">signup</Link>
          </h1>
        ) : (
          <div className="ItemsCon">
            <div>
              <input
                className="addInput"
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
              />
              <button className="add" onClick={addtask}>
                ADD
              </button>
            </div>
            {tasks.length ? (
              <ul className="list">
                {tasks.map((todo) => (
                  <div key={todo._id} className="listItem">
                    <li>{todo.name}</li>
                    <div>
                      <button
                        className="update"
                        onClick={() => updatetask(todo._id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete"
                        onClick={() => deletetask(todo._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <h2>You don't have any tasks yet!!</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Todos;

