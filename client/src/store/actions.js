export const onListRecieved = (list) => {
  return {
    type: 'ON_LIST_RECIEVED',
    list: list
  }
};

export const onTaskTextChange = (newText) => {
  return {
    type: 'ON_TASK_TEXT_CHANGE',
    newText: newText
  }
};

export const onTaskPerformerChange = (newPerformer) => {
  return {
    type: 'ON_TASK_PERFORMER_CHANGE',
    newPerformer: newPerformer
  }
};

export const onTaskPriorityChange = (newPriority) => {
  return {
    type: 'ON_TASK_PRIORITY_CHANGE',
    newPriority: newPriority
  }
};
