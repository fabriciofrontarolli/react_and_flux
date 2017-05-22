import EventEmitter from 'events';

import * as constants from '../types';

class TasksStore extends EventEmitter {

  constructor() {
    super();

    /* Initiate the State */
    this.tasks = [];

    this.action = this.action.bind(this);
  }

  getTasks() {
    return this.tasks.slice(0);
  }

  addTask(task) {
    /* Creates a new copy of the tasks */
    const tasks = this.tasks.slice(0);

    /* Adds the new Task to the Tasks List */
    tasks.push(task);
    this.tasks = tasks;

    /* Emit changes */
    this.emit('change');
  }

  initTasks(tasks) {
    this.tasks = tasks;
    
    /* Emit changes */
    this.emit('change');
  }

  action( { type, payload } ) {

    switch (type) {
      case constants.ADD_TASK:
        this.addTask(payload);
        break;
      case constants.INIT_TASKS:
        this.initTasks(payload);
        break;
    }
  }

}

export default new TasksStore();
