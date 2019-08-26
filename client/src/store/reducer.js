const initState = {
  list: [
    {
      task: '',
      performer: '',
      priority: 1
    }
  ],
  newTaskText: '',
  newTaskPerformer: '',
  newTaskPriority: 1
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ON_LIST_RECIEVED':
      return {
        ...state,
        list: action.list,
        newTaskText: '',
        newTaskPerformer: '',
        newTaskPriority: 1
      }
    case 'ON_TASK_TEXT_CHANGE':
      return {
        ...state,
        newTaskText: action.newText
      }
    case 'ON_TASK_PERFORMER_CHANGE':
      return {
        ...state,
        newTaskPerformer: action.newPerformer
      }
    case 'ON_TASK_PRIORITY_CHANGE':
      return {
        ...state,
        newTaskPriority: action.newPriority
      }
    default:
      return state;
  }
}

export default reducer;