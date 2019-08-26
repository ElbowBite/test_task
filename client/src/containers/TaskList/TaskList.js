import React, { useEffect } from 'react';
import { connect } from "react-redux";
import injectSheet from 'react-jss';

import * as actions from '../../store/actions';
import styles from './TaskList.styles';
import buttons from '../UI/PriorityButtons.styles';

const TaskList = (props) => {

  const { classes } = props;
  const { list } = props;

  useEffect(() => {
    fetch('/api/getList')
      .then((res) => res.json())
      .then((list) => props.onListRecieved(list))
  }, []);

  const handlePriorityUpdate = (taskId, newPriority) => {
    fetch('/api/updatePriority', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: taskId,
        priority: newPriority
      })
    })
      .then((res) => res.json())
      .then((list) => props.onListRecieved(list))
  };

  const handleTaskRemoval = (taskId) => {
    fetch('/api/removeTask', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: taskId })
    })
      .then((res) => res.json())
      .then((list) => props.onListRecieved(list))
  };

  return (
    <table className={classes.TaskList}>
      {list.length ? (
        <>
          <th>Task</th><th>Performer</th><th>Priority</th><th>Delete</th>
            {list.map((item) => (
              <tbody>
                  <tr key={item.id}>
                    <td>
                      {item.task}
                    </td>
                    <td>
                      {item.performer}
                    </td>
                    <td>
                      <button
                        className={classes.incPriority}
                        onClick={() => handlePriorityUpdate(item.id, item.priority + 1)}
                        disabled={item.priority === 10}
                      />
                      {item.priority}
                      <button
                        className={classes.decPriority}
                        onClick={() => handlePriorityUpdate(item.id, item.priority - 1)}
                        disabled={item.priority === 1}
                      />
                    </td>
                    <td>
                      <button
                        className={classes.TaskRemoval}
                        onClick={() => handleTaskRemoval(item.id)}
                      />
                    </td>
                  </tr>
              </tbody>
            ))}
        </>
      ) : (
        <th>
          <h2>You are all done, no tasks to do!</h2>
        </th>
      )}
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onListRecieved: (list) => dispatch(actions.onListRecieved(list))
  };
};

const styledComp = injectSheet(buttons)(injectSheet(styles)(TaskList));
 
export default connect(mapStateToProps, mapDispatchToProps)(styledComp);
