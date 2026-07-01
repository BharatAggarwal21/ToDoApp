import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Layout/Navbar";
import CreateTodoModal from "../../components/CreateTodoModal/CreateTodoModal";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import { sortTasksByCompletion } from "../../Utils/StringUtils";
import "./HomePage.css";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);

  // Open Modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  // Search Task
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filterList = allTask?.filter((item) =>
      item.taskName.toLowerCase().match(query.toLowerCase())
    );
    setFilteredTask(filterList);
  };

  // Get User todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData?.user.id;

  const getUserTask = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setLoading(false);
      const sortedData = sortTasksByCompletion(data?.todos);
      setFilteredTask(sortedData);
      setAllTask(sortedData);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  // Initial call
  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  const totalCount = allTask.length;
  const completedCount = allTask.filter((task) => task?.isCompleted).length;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="tasks-container">
          <div className="tasks-header">
            <h2 className="todo-title">My Tasks</h2>
            {totalCount > 0 && (
              <>
                <p className="todo-subtitle">
                  {completedCount} of {totalCount} completed
                </p>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(completedCount / totalCount) * 100}%`,
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="add-task">
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className=" btn btn-primary" onClick={openModalHandler}>
              Add Task <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {loading ? (
            <Spinner />
          ) : filteredTask.length > 0 ? (
            <div className="card-container">
              {filteredTask?.map((task, i) => (
                <Card key={i} task={task} getUserTask={getUserTask} />
              ))}
            </div>
          ) : (
            <div className="no-data-container">
              <img
                alt="no task"
                src={`${process.env.PUBLIC_URL}/nodata.png`}
                className="no-data-img"
              />
              <p className="no-task">No Tasks Found</p>
            </div>
          )}
          {/* ========== modal =========== */}
          <CreateTodoModal
            getUserTask={getUserTask}
            showModal={showModal}
            setShowModal={setShowModal}
            taskName={taskName}
            setTaskName={setTaskName}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
