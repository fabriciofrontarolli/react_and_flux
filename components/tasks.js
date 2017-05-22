// Frameworks
import React  		   from 'react';
// Components
import Task   		   from './task';
import Button 		   from './button';

// Flux
import taskStore     from '../flux/stores/tasks';
import { addTask,
				 initTasks } from '../flux/actions/tasks';

export default class Tasks extends React.Component {

	constructor (props){
		super(props);

		this.state = {
			tasks: taskStore.getTasks()
		}

		this.addTask = this.addTask.bind(this);
	}

	componentDidMount (){
		/* Everytime the Task Store emits 'change', Refetch All Tasks from Store */
		taskStore.on('change',() => {
			this.setState({
					tasks: taskStore.getTasks()
				});
		});

		initTasks();
	}

	addTask (e) {
		const tasks = this.state.tasks.slice(0);
		const input = this.input;

		addTask( { label: input.value } );
	}

	render(){
		const { tasks } = this.state;
		const taskList = [];

		for (const { _id,label, ...rest } of tasks) {
			taskList.push(
				<Task key={ _id } id={ _id }>
					{ label }
				</Task>
			);
		}

		return (
			<div>

				{ taskList }

				<input name="add" ref={ (a) => { this.input = a } } type="text" />
				<Button className="-secondary" onClick={ this.addTask }>Add Task</Button>
			</div>
		);
	}
}
