const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskConroller");
const { authentication } = require("../middleware/authentication");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user/detail", authentication, userController.getUserDetail);
router.post("/logout", userController.logout);

router.post("/tasks", authentication, taskController.createTask);
router.get("/tasks", authentication, taskController.getAllTasks);
router.get("/tasks/:id", authentication, taskController.getTask);
router.put("/tasks/:id", authentication, taskController.updateTask);
router.delete("/tasks/:id", authentication, taskController.deleteTask);

module.exports = router;
