import arrowUp from '../../assets/arrows/arrowUP.svg';
import arrowDown from '../../assets/arrows/arrowDOWN.svg';

const styles = {
  priorityButtons: {
    margin: '0 5px 0 5px',
    height: '10px',
    width: '14px',
    border: 'none',
    backgroundSize: '100%',
    cursor: 'pointer',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed'
    }
  },
  incPriority: {
    extend: 'priorityButtons',
    background: `url(${arrowUp}) no-repeat`
  },
  decPriority: {
    extend: 'priorityButtons',
    background: `url(${arrowDown}) no-repeat`
  }
}

export default styles;