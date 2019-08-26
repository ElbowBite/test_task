import React from 'react';

import './App.css';
import NewTaskAdder from './containers/NewTaskAdder/NewTaskAdder';
import TaskList from './containers/TaskList/TaskList';

const App = () => {
  return (
    <div className="App">
      <NewTaskAdder />
      <TaskList />
    </div>
  );
}

export default App;
