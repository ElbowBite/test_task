const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variable storing data
let list = [
  {
    task: 'initialTask',
    performer: 'initialPerformer',
    priority: 9,
    id: 0
  }
];

// Variable storing last task id
let lastId = 0;

// Comparison function for sorting
const compare = (a, b) => {
  let comparison = 0;
  const aPriority = a.priority;
  const bPriority = b.priority;
  if (aPriority > bPriority) {
    comparison = -1;
  } else if (aPriority < bPriority) {
    comparison = 1;
  } else if (aPriority === bPriority) {
      const aId = a.id;
      const bId = b.id;
      if (aId > bId) {
        comparison = 1;
      } else if (aId < bId) {
        comparison = -1;
    }
  }
  return comparison;
}

// Priority update function
const updatePriority = ( taskToUpdate, newPriority ) => {
  for (let i in list) {
    if (list[i].id == taskToUpdate) {
       list[i].priority = newPriority;
       break;
    }
  }
};

// Task removing function
const removeTask = ( taskToRemove ) => {
  const updatedList = list.filter( (item) => item.id !== taskToRemove );
  list = updatedList;
};

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  res.json(list);
});

// An api endpoint that updates list
app.post('/api/updateTask', (req, res) => {
  lastId++;
  req.body.id = lastId;
  list.push(req.body);
  list.sort(compare);
  res.send(list);
});

// An api endpoit that updates task's priority
app.post('/api/updatePriority', (req, res) => {
  updatePriority(req.body.id, req.body.priority);
  list.sort(compare);
  res.send(list);
});

// An api endpoit that removes task
app.delete('/api/removeTask', (req, res) => {
  removeTask(req.body.id);
  list.sort(compare);
  res.send(list);
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/public/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
