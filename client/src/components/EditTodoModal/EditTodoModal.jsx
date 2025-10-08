import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const EditTodoModal = ({ task, setShowModal, getUserTask }) => {
  const [taskName, setTaskName] = useState(task?.taskName);

  const handleClose = () => {
    setShowModal(false);
  };

  const id = task?._id;

  //update
  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { taskName, createdBy, isCompleted: task?.isCompleted };
      if (!taskName) {
        return toast.error("Please provide task name");
      }
      await TodoServices.updateTodo(id, data);
      setShowModal(false);
      toast.success("Task Updated Successfully");
      setTaskName("");
      getUserTask();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {task && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Your Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Task name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodoModal;
