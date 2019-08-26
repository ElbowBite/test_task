import React, { useState } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import styles from './NewTaskAdder.styles';
import buttons from '../UI/PriorityButtons.styles';

const NewTaskAdder = ({
  classes,
  fetchList,
  onTaskAddition
}) => {

  const [newTaskText, onTaskTextChange] = useState('');
  const [newTaskPerformer, onTaskPerformerChange] = useState('');
  const [newTaskPriority, onTaskPriorityChange] = useState(1);

  const addNewTask = (e) => {
    if (newTaskText === '' || newTaskPerformer === '') {
      alert('Fill all fields.')
    } else {
      onTaskAddition(newTaskText, newTaskPerformer, newTaskPriority);
      fetchList();
      onTaskTextChange('');
      onTaskPerformerChange('');
      onTaskPriorityChange(1);
    }
    e.preventDefault();
  };

  const handleTaskTextChange = (e) => {
    if (e.target.value.length >= 40) {
      alert('Limit of 40 characters reached!');
    } else {
      onTaskTextChange(e.target.value);
    }
  };

  const handleTaskPerformerChange = (e) => {
    if (e.target.value.length >= 40) {
      alert('Limit of 40 characters reached!')
    } else {
      onTaskPerformerChange(e.target.value);
    }
  };

  const handlePriorityInc = (e) => {
    onTaskPriorityChange(newTaskPriority + 1);
    e.preventDefault();
  };

  const handlePriorityDec = (e) => {
    onTaskPriorityChange(newTaskPriority - 1);
    e.preventDefault();
  };

  return (
    <div>
      <form className={classes.NewTaskForm} onSubmit={addNewTask}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskText}
          onChange={handleTaskTextChange}
          className={classes.TaskText}
        />
        <input
          type="text"
          placeholder="Enter performer of a new task"
          value={newTaskPerformer}
          onChange={handleTaskPerformerChange}
          className={classes.TaskText}
        />
        <span className={classes.Span}>
          Priority
        </span>
        <button
          name="incPriority"
          className={classes.incPriority}
          onClick={handlePriorityInc}
          disabled={newTaskPriority === 10}
        />
        <span className={classes.Span}>
          {newTaskPriority}
        </span>
        <button
          name="decPriority"
          className={classes.decPriority}
          onClick={handlePriorityDec}
          disabled={newTaskPriority === 1}
        />
        <input
          type="submit"
          value="Add new task"
          className={classes.SubmitButton}
          disabled={!newTaskText || !newTaskPerformer}
        />
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    newTaskText: state.newTaskText,
    newTaskPerformer: state.newTaskPerformer,
    newTaskPriority: state.newTaskPriority
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchList: () => dispatch(actions.fetchList()),
    onTaskAddition: (newTaskText, newTaskPerformer, newTaskPriority) => 
      dispatch(actions.taskAddition(newTaskText, newTaskPerformer, newTaskPriority))
  };
};

const styledComp = injectSheet(buttons)(injectSheet(styles)(NewTaskAdder));

export default connect(mapStateToProps, mapDispatchToProps)(styledComp);
