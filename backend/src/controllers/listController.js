import List from '../models/listModel.js';

// Logic to create a new list for a board
export async function createList(req, res){

    try{

        const {title, boardId} = req.body;

        const newList = await List.create({
            title,
            boardId,
            position: 0 // Setting to 0 by default
        })
        res.status(200).json(newList);

    }catch(err){
        res.status(500).json({message: err.message});
    }

}


// Logic to get all Lists by board
export async function getListsByBoard(req, res){

    try{

        const lists = await List.find({boardId: req.query.boardId}).sort('position');
        res.json(lists);
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
}