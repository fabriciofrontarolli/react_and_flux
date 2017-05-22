import d from '../dispatcher';
import * as constants from '../types';
import ajax from '../../utils/ajax';

/* Called from UI to add in the Backend */
export function addTask (task) {
	ajax({
		url: '/add-task',
		data: task,
		successHook: (taskModel) => {
			console.log("task added");
			addTaskSync(taskModel);
		}
	});
}

/* When Backend added a task, call this action to update the Store */
export function addTaskSync (task){
	d.dispatch({
		type: constants.ADD_TASK,
		payload: task
	});
}

/* Calls the Backend to remove a task */
export function remove (task){
	ajax({
		url:'/remove',
		data:task,
		successHook: ({ removed }) => {
			/* When removed from backend, Update the Store */
			removed && d.dispatch({
											type: constants.REMOVED,
											payload: task
									 });
		}
	});
}

/* Loads all tasks from Backend */
export function initTasks (){
	ajax({
		url:'/all',
		method:'get',
		successHook: (tasks) => {
			/* When all tasks were Fetched, Update the Store by calling the Dispatcher */
			d.dispatch( {
				type: constants.INIT_TASKS,
				payload:tasks
			});
		}
	});
}
