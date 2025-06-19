const { AppDataSource } = require('../config/database');
const { Task } = require('../entities/Task');
const { v4: uuidv4 } = require('uuid');

const taskRepository = () => AppDataSource.getRepository(Task);

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const repository = taskRepository();
    
    let tasks;
    if (status && ['todo', 'in_progress', 'done'].includes(status)) {
      tasks = await repository.find({ 
        where: { status },
        order: { createdAt: 'DESC' }
      });
    } else {
      tasks = await repository.find({ 
        order: { createdAt: 'DESC' } 
      });
    }
    
    res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks',
      message: error.message
    });
  }
};

// Get single task
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const repository = taskRepository();
    
    const task = await repository.findOne({ where: { id } });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task',
      message: error.message
    });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, status = 'todo', dueDate } = req.body;
    
    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }
    
    if (status && !['todo', 'in_progress', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be: todo, in_progress, or done'
      });
    }
    
    const repository = taskRepository();
    
    const newTask = repository.create({
      id: uuidv4(),
      title: title.trim(),
      description: description?.trim() || null,
      status,
      dueDate: dueDate ? new Date(dueDate) : null
    });
    
    const savedTask = await repository.save(newTask);
    
    res.status(201).json({
      success: true,
      data: savedTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task',
      message: error.message
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    
    const repository = taskRepository();
    
    const existingTask = await repository.findOne({ where: { id } });
    
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    // Validation
    if (title !== undefined && (!title || title.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        error: 'Title cannot be empty'
      });
    }
    
    if (status && !['todo', 'in_progress', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be: todo, in_progress, or done'
      });
    }
    
    // Update fields
    if (title !== undefined) existingTask.title = title.trim();
    if (description !== undefined) existingTask.description = description?.trim() || null;
    if (status !== undefined) existingTask.status = status;
    if (dueDate !== undefined) existingTask.dueDate = dueDate ? new Date(dueDate) : null;
    
    const updatedTask = await repository.save(existingTask);
    
    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task',
      message: error.message
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const repository = taskRepository();
    
    const result = await repository.delete({ id });
    
    if (result.affected === 0) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task',
      message: error.message
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};