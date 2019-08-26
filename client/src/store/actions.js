import * as actionTypes from './actionTypes';

const listFetchSuccess = list => ({
  type: actionTypes.LIST_FETCH_SUCCESS,
  list
});

const listFetchFailure = errors => ({
  type: actionTypes.LIST_FETCH_FAILURE,
  errors
});

export const fetchList = () => {
  return dispatch => {
    fetch('/api/getList')
      .then((res) => res.json())
      .then((list) => dispatch(listFetchSuccess(list)))
      .catch((errors) => dispatch(listFetchFailure(errors)));
  }
};

export const taskAddition = ({newTaskText, newTaskPerformer, newTaskPriority}) => {
  return dispatch => {
    fetch('/api/updateTask', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        task: newTaskText,
        performer: newTaskPerformer,
        priority: newTaskPriority
      })
    })
      .then((res) => res.json())
      .catch((errors) => dispatch(listFetchFailure(errors)));
  }
};

export const taskRemoval = (taskId) => {
  return dispatch => {
    fetch('/api/removeTask', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: taskId })
    })
      .then((res) => res.json())
      .catch((errors) => dispatch(listFetchFailure(errors)));
  }
};

export const taskPriorityUpdate = (taskId, newPriority) => {
  return dispatch => {
    fetch('/api/updatePriority', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: taskId,
        priority: newPriority
      })
    })
      .then((res) => res.json())
      .catch((errors) => dispatch(listFetchFailure(errors)));
  }
};
