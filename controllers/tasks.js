const Task = require("../models/Task");

// 一覧表示
const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json(allTask);

    } catch(err) {
      res.status(500).json(err);
    }
};

// dbと接続する際は非同期処理でなければならない
const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);

  } catch(err) {
    res.status(500).json(err);
  }
};

// 個別取得
const getSingleTask = async (req, res) => {
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id });
    
    if(!getSingleTask) {
      return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    }

    res.status(200).json(getSingleTask);

  } catch(err) {
    res.status(500).json(err);
  }
}

// 更新処理
const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id }, 
      req.body,
      {
        new: true,
      }
    );
    
    if(!updateTask) {
      return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    }

    res.status(200).json(updateTask);

  } catch(err) {
    res.status(500).json(err);
  }
}

// 削除
const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete(
      { _id: req.params.id }, 
    );
    
    if(!deleteTask) {
      return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    }

    res.status(200).json(deleteTask);

  } catch(err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask
};