import Task from "../models/taskModel.js";
import Activity from "../models/activityModel.js";
import { io } from "../../server.js";

// Logic to create a new task
export async function createTask(req, res) {
  try {
    const { title, listId, boardId } = req.body;

    // 1. Manual validation check
    if (!title || title.trim().length < 2) {
      res
        .status(400)
        .json({ message: "Ttitle must be atleast 2 characters long." });
    }

    if (!listId || !boardId) {
      res
        .status(400)
        .json({ message: "listId and boardId are required to create a task." });
    }

    const newTask = await Task.create({
      title,
      boardId,
      listId,
      position: 0,
    });

    // For tracking activity history
    await Activity.create({
      boardId: boardId,
      user: req.user._id,
      action: "CREATE_TASK",
      details: { taskTitle: title },
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logic to get all tasks for a specific board
export async function getTasksByBoard(req, res) {
  try {
    const { boardId } = req.query;
    const tasks = await Task.find({ boardId }).sort("position").populate('assignees', 'name email')
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logic for moving a task ( Drag and Drop )
export async function updateTaskPosition(req, res) {
  try {
    const { taskId, newListId, newPosition, boardId } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { listId: newListId, position: newPosition },
      { new: true },
    );

    // BROADCAST: Tell everyone in this board room to refresh
    io.to(boardId).emit("boardUpdated");

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete a task
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const { boardId } = req.query;
    await Task.findByIdAndDelete(id);

    io.to(boardId).emit("boardUpdated");
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update a task title/description
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, boardId } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );

    io.to(boardId).emit("boardUpdated");
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logic to assign task to members
export async function assignTask(req, res){
  try{

    const {taskId} = req.params;
    const {userId} = req.body;

    console.log(`Assigning User ${userId} to Task ${taskId}`);

    const task = await Task.findByIdAndUpdate(
      taskId,
      {$addToSet: {assignees: userId}},
      {new: true}
    ).populate('assignees', 'name email')

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Log Activity
    await Activity.create({
      boardId: task.boardId,
      user: req.user._id,
      action: 'ASSIGN_TASK',
      details: {taskTitle: task.title}
    })

    if(task.boardId) io.to(task.boardId.toString()).emit("boardUpdated");
    res.json(task);

  }catch(err){
    res.status(500).json({message: err.message})
  }
}
