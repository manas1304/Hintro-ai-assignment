import Task from '../models/taskModel.js';
import Activity from '../models/activityModel.js'

// Logic to create a new task
export async function createTask(req, res){
    
    try{

        const {title, listId, boardId} = req.body;

        // 1. Manual validation check
        if(!title || title.trim().length < 2){
            res.status(400).json({message: "Ttitle must be atleast 2 characters long."})
        }

        if(!listId || !boardId){
            res.status(400).json({message: "listId and boardId are required to create a task."})
        }

        const newTask = await Task.create({
            title,
            boardId,
            listId,
            position: 0
        })

        // For tracking activity history
        await Activity.create({
            boardId: boardId,
            user: req.user._id,
            action: 'CREATE_TASK',
            details: {taskTitle: title}
        });

        res.status(201).json(newTask)

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// Logic for moving a task ( Drag and Drop )
export async function updateTaskPosition(req, res){
    try{

        const {taskId, newListId, newPosition} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {listId: newListId, position: newPosition},
            {new: true}
        )
        res.json(updatedTask);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}