import React, { useState } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import styles from './NewTaskAdder.styles';
import buttons from '../UI/PriorityButtons.styles';

const NewTaskAdder = (props) => {

  const classes = props.classes;

  const [curPriority, changeCurPriority] = useState(1);
  const [taskFilled, updateTaskFilled] = useState(false);
  const [performerFilled, updatePerformerFilled] = useState(false);

  const addNewTask = (e) => {
    if (props.newTaskText === '' || props.newTaskPerformer === '') {
      alert('Fill all fields.')
    } else {
      fetch('/api/updateTask', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          task: props.newTaskText,
          performer: props.newTaskPerformer,
          priority: props.newTaskPriority
        })
      })
        .then((res) => res.json())
        .then(list => props.onListRecieved(list))
      changeCurPriority(1);
    }
    e.preventDefault();
  };

  const handleTaskTextChange = (e) => {
    if (e.target.value.length >= 40) {
      alert('Limit of 40 characters reached!');
    } else {
      updateTaskFilled(e.target.value.length);
      props.onTaskTextChange(e.target.value);
    }
  };

  const handleTaskPerformerChange = (e) => {
    if (e.target.value.length >= 40) {
      alert('Limit of 40 characters reached!')
    } else {
      updatePerformerFilled(e.target.value.length);
      props.onTaskPerformerChange(e.target.value);
    }
  };

  const handlePriorityInc = (e) => {
    changeCurPriority(curPriority + 1);
    props.onTaskPriorityChange(curPriority + 1);
    e.preventDefault();
  };

  const handlePriorityDec = (e) => {
    changeCurPriority(curPriority - 1);
    props.onTaskPriorityChange(curPriority - 1);
    e.preventDefault();
  };

  return (
    <div>
      <form className={classes.NewTaskForm} onSubmit={addNewTask}>
        <input
          type="text"
          placeholder="Enter new task"
          value={props.newTaskText}
          onChange={handleTaskTextChange}
          className={classes.TaskText}
        />
        <input
          type="text"
          placeholder="Enter performer of a new task"
          value={props.newTaskPerformer}
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
          disabled={curPriority === 10}
        />
        <span className={classes.Span}>
          {curPriority}
        </span>
        <button
          name="decPriority"
          className={classes.decPriority}
          onClick={handlePriorityDec}
          disabled={curPriority === 1}
        />
        <input
          type="submit"
          value="Add new task"
          className={classes.SubmitButton}
          disabled={!taskFilled || !performerFilled}
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
    onListRecieved: (list) => dispatch(actions.onListRecieved(list)),
    onTaskTextChange: (newText) => dispatch(actions.onTaskTextChange(newText)),
    onTaskPerformerChange: (newText) => dispatch(actions.onTaskPerformerChange(newText)),
    onTaskPriorityChange: (newPriority) => dispatch(actions.onTaskPriorityChange(newPriority))
  };
};

const styledComp = injectSheet(buttons)(injectSheet(styles)(NewTaskAdder));

export default connect(mapStateToProps, mapDispatchToProps)(styledComp);
