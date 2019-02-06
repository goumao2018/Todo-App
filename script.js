var yujinsSweetSweetTodoList = (function() {
  var count = 0;
  var NONE = "NONE";
  var COMPLETED = "COMPLETED";
  var ACTIVE = "ACTIVE";
  var REMOVED = "REMOVED";
  var state = {
    filter: NONE,
    todos: [
      {
        id: 1,
        done: false,
        content: "sing a song",
        delete: false
      },
      {
        id: 2,
        done: true,
        content: "study javascript",
        delete: false
      },
      {
        id: 3,
        done: true,
        content: "drink coffee",
        delete: false
      },
      {
        id: 4,
        done: false,
        content: "GOODBYE Media :((((((",
        delete: false
      }
    ]
  };
  var rootElement = document.getElementById("root");
  var formElement = document.getElementById("form");
  var inputElement = document.getElementById("addTodoInput");
  var completedBtn = document.getElementById("completedBtn");
  var allBtn = document.getElementById("allBtn");
  var activeBtn = document.getElementById("activeBtn");
  var removedBtn = document.getElementById("removedBtn");
  var nextId = 999;

  // functions that return values
  function createCheckboxElement(todo) {
    var checkboxElement = document.createElement("INPUT");
    checkboxElement.id = todo.id;
    checkboxElement.type = "checkbox";
    checkboxElement.checked = todo.done;
    checkboxElement.addEventListener("change", toggleTodo);
    return checkboxElement;
  }

  function createLabelElement(todo) {
    var labelElement = document.createElement("label");
    labelElement.htmlFor = todo.id;
    labelElement.innerText = todo.content;
    if (todo.done === true) {
      var str = labelElement.innerText;
      var result = str.strike();
      labelElement.innerHTML = result;
    }
    return labelElement;
  }

  function createDeleteButton(eventHandler) {
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerText = "x";
    deleteButton.addEventListener("click", eventHandler);
    return deleteButton;
  }

  function createListElement(todo) {
    var listElement = document.createElement("li");
    var checkboxElement = createCheckboxElement(todo);
    var labelElement = createLabelElement(todo);
    var deleteButton = createDeleteButton(handleDeleteTodo);

    // DOM stuff
    listElement.appendChild(checkboxElement);
    listElement.appendChild(labelElement);
    listElement.appendChild(deleteButton);
    return listElement;
  }

  // functions that have side effects

  function handleSubmit(event) {
    count++;
    console.log(`handleSubmit called ${count} times`);
    event.preventDefault();
    var newTodo = {
      id: nextId,
      done: false,
      content: inputElement.value,
      delete: false
    };
    nextId++;
    state.todos.push(newTodo);
    console.log(state);

    render(state);

    formElement.reset();
  }

  function toggleTodo(event) {
    var labelElementId = Number(event.target.id);
    state.todos.forEach(function(todo) {
      if (todo.id === labelElementId) {
        todo.done = !todo.done;
      }
    });

    render(state);
  }

  function handleDeleteTodo(event) {
    event.preventDefault();
    var listElement = event.target.parentElement;
    var labelElement = listElement.querySelector("label");
    var todoId = Number(labelElement.htmlFor);

    function findDeleteTodo(item) {
      return item.id === todoId;
    }

    state.todos.find(findDeleteTodo).delete = true;

    function findTodoById(item) {
      return item.id === todoId;
    }

    var todoIndex = state.todos.findIndex(findTodoById);
    state.todos.splice(todoIndex, 1);
    render(state);
  }

  function filterTodos(state) {
    return state.todos.filter(function(todo) {
      if (state.filter === COMPLETED && todo.done) {
        return todo;
      }
      if (state.filter === ACTIVE && !todo.done) {
        return todo;
      }
      if (state.filter === NONE) {
        return todo;
      }
      if (state.filter === REMOVED && todo.delete) {
        return todo;
      }
    });
  }

  function render(state) {
    rootElement.innerHTML = "";
    const filteredTodos = filterTodos(state);
    filteredTodos.forEach(function(todo) {
      rootElement.appendChild(createListElement(todo));
    });
  }

  function handleFilterClick(event) {
    if (event.srcElement.id === "completedBtn") {
      state.filter = COMPLETED;
    } else if (event.srcElement.id === "activeBtn") {
      state.filter = ACTIVE;
    } else if (event.srcElement.id === "deleteBtn") {
      state.filter = DONE;
    } else if (event.srcElement.id === "removedBtn") {
      state.filter = REMOVED;
    } else {
      state.filter = NONE;
    }
    render(state);
  }

  render(state);

  formElement.addEventListener("submit", handleSubmit);
  completedBtn.addEventListener("click", handleFilterClick);
  allBtn.addEventListener("click", handleFilterClick);
  activeBtn.addEventListener("click", handleFilterClick);
  removedBtn.addEventListener("click", handleFilterClick);

  return {
    createCheckboxElement: createCheckboxElement,
    createLabelElement: createLabelElement,
    createDeleteButton: createDeleteButton,
    createListElement: createListElement,
    filterTodos: filterTodos
  };
})();

/**
 * TODO:
 * styles
 * write tests
 * add removed filter
 * */
