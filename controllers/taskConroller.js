const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const task = new Task({
      title,
      user: req.userId,
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({ _id: taskId, user: req.userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, completed } = req.body;

    const task = await Task.findOne({ _id: taskId, user: req.userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;
    task.completed = completed;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({ _id: taskId, user: req.userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
