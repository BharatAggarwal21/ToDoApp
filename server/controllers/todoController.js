const todoModel = require("../models/todoModel");

// CREATE TODO
const createTodoController = async (req, res) => {
  try {
    const { taskName, createdBy } = req.body;
    if (!taskName) {
      return res.status(500).send({
        success: false,
        message: "Please provide task name",
      });
    }
    const todo = new todoModel({ taskName, createdBy });
    const result = await todo.save();
    res.status(201).send({
      success: true,
      message: "Your task has been created",
      result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating task",
      error,
    });
  }
};

//GET TODO
const getTodoController = async (req, res) => {
  try {
    //get user id
    const { userId } = req.params;
    //validate
    if (!userId) {
      return res.status(404).send({
        success: false,
        message: "No user found with this id",
      });
    }
    //find task
    const todos = await todoModel.find({ createdBy: userId });
    if (!todos) {
      return res.status(404).send({
        success: true,
        message: "You have no tasks ",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your tasks",
      todos,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting tasks",
      error,
    });
  }
};

//delete api
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "No task found with this id",
      });
    }
    //find id
    const todo = await todoModel.findByIdAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Your task has been deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting task",
    });
  }
};

//Update todo
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide task id",
      });
    }
    const data = req.body;
    //updte
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "Your task has been updated",
      todo,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating task",
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
