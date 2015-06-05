
// To Do App
var taskInput             = document.getElementById('new-task'),
    addButton             = document.getElementsByTagName('button')[0],
    incompleteTasksHolder = document.getElementById('incomplete-tasks'),
    completedTasksHolder  = document.getElementById('completed-tasks');

// New Task List Item
var createNewTaskElement = function( taskString ) {
  // Create List Item
  var listItem     = document.createElement('li'),
      checkBox     = document.createElement('input'),
      label        = document.createElement('label'),  
      editInput    = document.createElement('input'),
      editButton   = document.createElement('button'),
      deleteButton = document.createElement('button');
   
  // Element modifications
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  label.innerText = taskString;

  listItem.appendChild( checkBox );
  listItem.appendChild( label );
  listItem.appendChild( editInput );
  listItem.appendChild( editButton );
  listItem.appendChild( deleteButton );
  
  return listItem;
}

// Add a new task
var addTask = function() {

  if ( taskInput.value === '' ) {
    alert( 'Please enter a name for the task' );
  } else {
    // Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement( taskInput.value );
    
    // Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';
  }
}

// Edit an existing task
var editTask = function() {

  var listItem      = this.parentNode,
      editInput     = listItem.querySelector('input[type=text]'),
      label         = listItem.querySelector('label'),
      containsClass = listItem.classList.contains('editMode'),
      editButton    = listItem.querySelector('button.edit');

  if ( containsClass ) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle( 'editMode' );
}

// Delete an existing task
var deleteTask = function() {

  var listItem = this.parentNode,
      ul       = listItem.parentNode;

  ul.removeChild(listItem);
}

// Mark a task as complete
var taskCompleted = function() {

  var listItem = this.parentNode;

  completedTasksHolder.appendChild( listItem );
  bindTaskEvents( listItem, taskIncomplete );
}

// Mark a tast as incomplete
var taskIncomplete = function() {
  var listItem = this.parentNode;

  incompleteTasksHolder.appendChild( listItem );
  bindTaskEvents( listItem, taskCompleted );
}

var bindTaskEvents = function( taskListItem, checkBoxEventHandler ) {

  var checkbox     = taskListItem.querySelector( 'input[type=checkbox]' ),
      editButton   = taskListItem.querySelector( 'button.edit' ),
      deleteButton = taskListItem.querySelector( 'button.delete' );
  
  // bind events to buttons
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  //console.log( 'Ajax Request' );
}

// Event Handlers
addButton.addEventListener( 'click', addTask );
addButton.addEventListener( 'click', ajaxRequest );

// Cycle over incompletedTaskHolder ul list items
for ( var i = 0; i < incompleteTasksHolder.children.length; i++ ) {
  // bind events to list item's children (taskCompleted)
  bindTaskEvents( incompleteTasksHolder.children[i], taskCompleted );
}

// Cycle over completedTasksHolder ul list items
for ( var i = 0; i < completedTasksHolder.children.length; i++ ) {
  // bind events to list item's children (taskCompleted)
  bindTaskEvents( completedTasksHolder.children[i], taskIncomplete );
}
