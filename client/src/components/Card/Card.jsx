import React, { useState } from "react";
import EditTodoModal from "../EditTodoModal/EditTodoModal";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";
import "./Card.css";

const Card = ({ task, getUserTask }) => {
  const [showModal, setShowModal] = useState(false);

  //handle edit
  const handleEdit = () => {
    setShowModal(true);
  };

  //hanlde delete
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Successfully");
      getUserTask();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleComplete = async (id, taskName) => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { taskName, createdBy, isCompleted: true };
      if (!taskName) {
        return toast.error("Please provide task name");
      }
      await TodoServices.updateTodo(id, data);
      setShowModal(false);
      toast.success("Task Updated Successfully");
      getUserTask();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="card border-primary mb-3 mt-3" key={task?._id}>
        <div className="card-header">
          <input
            type="radio"
            onClick={() => handleComplete(task?._id, task.taskName)}
            checked={task?.isCompleted}
          />
        </div>
        <div className="card-body">
          <h6 className={task?.isCompleted ? "completed" : ""}>
            {task?.taskName}
          </h6>
          <h6>{task?.createdAt.substring(0, 10)}</h6>
        </div>
        <div className="card-footer bg-transparent border-primary">
          <button
            className="btn btn-warning"
            title="EDIT Task"
            onClick={handleEdit}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="btn btn-danger ms-2"
            title="Delete Task"
            onClick={() => handleDelete(task?._id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div>
        {showModal && (
          <EditTodoModal
            task={task}
            setShowModal={setShowModal}
            getUserTask={getUserTask}
          />
        )}
      </div>
    </>
  );
};

export default Card;
