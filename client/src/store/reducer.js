import * as actionTypes from './actionTypes';

const initState = {
  list: [
    {
      task: '',
      performer: '',
      priority: 1
    }
  ]
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LIST_FETCH_SUCCESS: {
      return {
        ...state,
        list: action.list
      }
    }
    default:
      return state;
  }
}

export default reducer;