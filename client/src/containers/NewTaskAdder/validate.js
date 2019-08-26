export const validate = (values) => {
  const errors = {};
  ['newTaskText', 'newTaskPerformer', 'newTaskPriority'].forEach((key) => {
    if (!values[key]) {
      errors[key] = 'Field is required';
    }
    if (values[key] && values[key].length > 40) {
      errors[key] = 'Limit of 40 characters reached'
    }
  });

  return errors;
}