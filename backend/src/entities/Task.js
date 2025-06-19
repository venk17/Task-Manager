const { EntitySchema } = require('typeorm');
const { v4: uuidv4 } = require('uuid');

const Task = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      generated: false, // Keep this as false since we will generate the ID manually
    },
    title: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    description: {
      type: 'text',
      nullable: true
    },
    status: {
      type: 'varchar',
      length: 20,
      nullable: false,
      default: 'todo',
      enum: ['todo', 'in_progress', 'done']
    },
    dueDate: {
      type: 'datetime',
      nullable: true
    },
    createdAt: {
      type: 'datetime',
      createDate: true
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true
    }
  }
});

// Function to create a new task
async function createTask(title, description) {
  const taskRepository = getRepository(Task);
  const task = taskRepository.create({
    id: uuidv4(), // Generate the UUID here
    title,
    description,
    status: 'todo', // Default status
  });
  await taskRepository.save(task);
}

module.exports = { Task, createTask };
