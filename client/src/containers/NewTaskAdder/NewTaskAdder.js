import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { validate } from './validate';
import * as actions from '../../store/actions';
import styles from './NewTaskAdder.styles';
import buttons from '../UI/PriorityButtons.styles';

const NewTaskAdder = ({
  classes,
  fetchList,
  onTaskAddition
}) => {
  const onSubmit = (vals) => {
    onTaskAddition(vals);
    fetchList();
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          newTaskText: '',
          newTaskPerformer: '',
          newTaskPriority: 1,
        }}
        mutators={{
          increment: ([propToUpdate], state, { changeValue }) => {
            changeValue(state, propToUpdate, () => ++state.formState.values.newTaskPriority )
          },
          decrement: ([propToUpdate], state, { changeValue }) => {
            changeValue(state, propToUpdate, () => --state.formState.values.newTaskPriority)
          }
        }}
      >
        {({ handleSubmit, valid, values, form: { mutators } }) => (
          <div className={classes.NewTaskForm}>
            <Field
              component="input"
              name="newTaskText"
              className={classes.TaskText}
              type="text"
              placeholder="Enter new task"
            />
            <Field
              component="input"
              name="newTaskPerformer"
              className={classes.TaskText}
              type="text"
              placeholder="Enter performer of a new task"
            />
            <Field
              component="input"
              name="newTaskPriority"
              readOnly
              className={classes.span}
              style={{ display: 'none' }}
            />
            <span className={classes.Span}>
              Priority
            </span>
            <button
              className={classes.incPriority}
              onClick={() => mutators.increment('newTaskPriority')}
              disabled={values.newTaskPriority === 10}
            />
            <span className={classes.Span}>
              {values.newTaskPriority}
            </span>
            <button
              className={classes.decPriority}
              onClick={() => mutators.decrement('newTaskPriority')}
              disabled={values.newTaskPriority === 1}
            />
            <input
              disabled={!valid}
              type="submit"
              onClick={handleSubmit}
              className={classes.SubmitButton}
              value="Add new task"  
            />
          </div>
        )}
      </Form>
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

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(actions.fetchList()),
    onTaskAddition: (vals) => dispatch(actions.taskAddition(vals)),
});

const styledComp = injectSheet(buttons)(injectSheet(styles)(NewTaskAdder));

export default connect(mapStateToProps, mapDispatchToProps)(styledComp);
