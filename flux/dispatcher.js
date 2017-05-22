// Frameworks
import { Dispatcher } from 'flux';

// Stores
import TaskStore from './stores/tasks';

/* Initialize Dispatcher */
const dispatcher = new Dispatcher();

dispatcher.register(TaskStore.action);

export default dispatcher;
