import Activity from '../models/activityModel.js';

// Logic to get all the history for a specific board
export async function getBoardActivity(req, res){
    try{

        const {boardId} = req.params;

        const activites = await Activity.find({boardId})
            .populate('user', 'name') // Attaches the name of the user with the log
            .sort({createdAt: -1}) // To get the latest created order

        res.json(activites)

    }catch(err){
        res.status(500).json({message: err.message});
    }
}