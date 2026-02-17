import Board from "../models/boardModel.js";
import User from "../models/userModel.js";
import Activity from "../models/activityModel.js";

// Logic to create new board
export async function createBoard(req, res) {
  try {
    const title = req.body.title;

    // We can id of the user since used 'protect' function as middleware
    const newBoard = await Board.create({
      title: title,
      owner: req.user._id,
    });

    res.status(200).json({ newBoard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logic to get all boards where the user is the owner or a member
export async function getAllBoards(req, res) {
  try {
    // Only get boards where the user is owner or member
    const boards = await Board.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logic to get a single board by ID
export async function getBoardById(req, res) {
  try {
    // Find the board
    const board = await Board.findById(req.params.id).populate('members', 'name email')

    // If board with that id not found
    if (!board) {
      res.status(404).json({ message: "Board not found" });
    }

    // Ensuring the user is owner or member
    const isOwner = board.owner.toString() === req.user._id.toString();
    const isMember = board.members.some(m => m._id.toString() === req.user._id.toString());

    if (!isOwner && !isMember) {
      res.status(403).json({ message: "Access Denied" });
    }
    res.status(200).json(board);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logic to add member to board
export async function addMemberToBoard(req, res) {
  try {
    const { boardId, email } = req.body;

    // Find user by email
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      res.status(404).json({ message: "User not found!" });
    }

    // Addding user to the board member array
    const board = await Board.findByIdAndUpdate(
      boardId,
      { $addToSet: { members: userToAdd._id } }, // This prevents duplicates members
      { new: true },
    ).populate('members', 'name email')

    await Activity.create({
      boardId,
      user: req.user._id, // The person who added the member
      action: "ADD_MEMBER",
      details: { taskTitle: userToAdd.name },
    });

    res.json({ message: "Member added successfully", board });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
