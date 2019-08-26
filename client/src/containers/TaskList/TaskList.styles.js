import deleteButton from '../../assets/delete.svg';

const styles = {
  TaskList: {
    border: '2px solid #6dd6f5b7',
    borderRadius: '10px',
    margin: 'auto',
    width: '80%',
    '& th': {
      background: 'black',
      borderRadius: '10px',
      fontSize: '18px',
      padding: '5px 0 5px'
    },
    '& td': {
      padding: '5px 0 5px',
      wordBreak: 'break-all'
    }
  },
  Task: {
    display: 'block',
    margin: '5px auto'
  },
  TaskRemoval: {
    width: '14px',
    height: '20px',
    border: 'none',
    cursor: 'pointer',
    background: `url(${deleteButton}) no-repeat`,
    backgroundSize: '100%'
  }
}

export default styles;