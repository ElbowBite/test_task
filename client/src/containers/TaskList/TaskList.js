import React, { useEffect } from 'react';
import { connect } from "react-redux";
import injectSheet from 'react-jss';

import * as actions from '../../store/actions';
import styles from './TaskList.styles';
import buttons from '../UI/PriorityButtons.styles';

const TaskList = ({
  list,
  classes,
  fetchList,
  taskRemoval,
  onTaskPriorityUpdate
}) => {

  useEffect(() => {
    fetchList();
  }, []);

  const handlePriorityUpdate = (taskId, newPriority) => {
    onTaskPriorityUpdate(taskId, newPriority);
    fetchList();
  };

  const handleTaskRemoval = (taskId) => {
    taskRemoval(taskId);
    fetchList();
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

const mapStateToProps = (state) => ({
    list: state.list
});

const mapDispatchToProps = (dispatch) => ({
    fetchList: () => dispatch(actions.fetchList()),
    taskRemoval: (taskId) => dispatch(actions.taskRemoval(taskId)),
    onTaskPriorityUpdate: (taskId, newPriority) => dispatch(actions.taskPriorityUpdate(taskId, newPriority))
});

const styledComp = injectSheet(buttons)(injectSheet(styles)(TaskList));
 
export default connect(mapStateToProps, mapDispatchToProps)(styledComp);
