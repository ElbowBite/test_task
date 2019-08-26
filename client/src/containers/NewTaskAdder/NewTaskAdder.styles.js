const styles = {
  NewTaskForm: {
    margin: '10px auto',
    width: '80%',
    textAlign: 'center',
    border: '2px solid #6dd6f5b7',
    borderRadius: '10px'
  },
  TaskText: {
    width: '90%',
    height: '30px',
    display: 'block',
    fontSize: '20px',
    margin: '5px auto'
  },
  Span: {
    fontWeight: 'bold',
    width: '20px'
  },
  SubmitButton: {
    width: '30%',
    height: '35px',
    fontSize: '15px',
    display: 'block',
    margin: '10px auto',
    cursor: 'pointer',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed'
    }
  }
}

export default styles;