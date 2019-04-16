var yujinsSweetSweetTodoList = (function() {
  // Action types
  var CHANGE_FILTER = "CHANGE_FILTER";
  var ADD_TODO = "ADD_TODO";
  var DELETE_TODO = "DELETE_TODO";
  var TOGGLE_TODO = "TOGGLE_TODO";

  // Filters
  var NONE = "NONE";
  var COMPLETED = "COMPLETED";
  var ACTIVE = "ACTIVE";
  var REMOVED = "REMOVED";

  var initialState = {
    filter: NONE,
    todos: []
  };

  function reducer(state, action) {
    switch (action.type) {
      case CHANGE_FILTER: {
        return { ...state, filter: action.payload };
      }
      case ADD_TODO: {
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: action.payload.id,
              done: false,
              content: action.payload.content,
              delete: false
            }
          ]
        };
      }
      case DELETE_TODO: {
        return {
          ...state,
          todos: state.todos.map(eachTodo => {
            if (action.payload === eachTodo.id) {
              return {
                ...eachTodo,
                delete: true
              };
            }
            return eachTodo;
          })
        };
      }
      case TOGGLE_TODO: {
        return {
          ...state,
          todos: state.todos.map(todo => {
            if (action.payload === todo.id) {
              return {
                ...todo,
                done: !todo.done
              };
            }
            return todo;
          })
        };
      }
      default: {
        return state;
      }
    }
  }

  // Initialise redux
  const store = Redux.createStore(reducer, initialState);

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
    checkboxElement.classList.add("checkbox");
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

  function createDeleteButton(functionWithActionsToCompleteOnClick) {
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerText = "x";
    deleteButton.addEventListener(
      "click",
      functionWithActionsToCompleteOnClick
    );
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
    event.preventDefault();
    var newTodo = {
      id: nextId,
      done: false,
      content: inputElement.value,
      delete: false
    };
    nextId++;

    store.dispatch({
      type: ADD_TODO,
      payload: {
        content: inputElement.value,
        id: nextId
      }
    });
    state.todos.push(newTodo);

    formElement.reset();
  }

  function toggleTodo(event) {
    var labelElementId = Number(event.target.id);

    store.dispatch({
      type: TOGGLE_TODO,
      payload: labelElementId
    });
  }

  function handleDeleteTodo(event) {
    event.preventDefault();
    var listElement = event.target.parentElement;
    var labelElement = listElement.querySelector("label");
    var todoId = Number(labelElement.htmlFor);

    store.dispatch({
      type: DELETE_TODO,
      payload: todoId
    });
  }

  function filterTodos(state) {
    return state.todos.filter(function(todo) {
      if (state.filter === COMPLETED && todo.done && !todo.delete) {
        return todo;
      }
      if (state.filter === ACTIVE && !todo.done && !todo.delete) {
        return todo;
      }
      if (state.filter === NONE && !todo.delete) {
        return todo;
      }
      if (state.filter === REMOVED && todo.delete) {
        return todo;
      }
    });
  }

  function render() {
    var reduxState = store.getState();
    rootElement.innerHTML = "";
    const filteredTodos = filterTodos(reduxState);
    filteredTodos.forEach(function(todo) {
      rootElement.appendChild(createListElement(todo));
    });
  }

  function handleFilterClick(event) {
    let newFilter;
    if (event.srcElement.id === "completedBtn") {
      newFilter = COMPLETED;
    } else if (event.srcElement.id === "activeBtn") {
      newFilter = ACTIVE;
    } else if (event.srcElement.id === "deleteBtn") {
      newFilter = DONE;
    } else if (event.srcElement.id === "removedBtn") {
      newFilter = REMOVED;
    } else {
      newFilter = NONE;
    }

    store.dispatch({
      type: CHANGE_FILTER,
      payload: newFilter
    });
  }

  render(state);

  formElement.addEventListener("submit", handleSubmit);
  completedBtn.addEventListener("click", handleFilterClick);
  allBtn.addEventListener("click", handleFilterClick);
  activeBtn.addEventListener("click", handleFilterClick);
  removedBtn.addEventListener("click", handleFilterClick);

  store.subscribe(render);

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
 * write tests
 * deploy to gh pages
 *
 * discussion topics
 * how did we begin
 * what problems we are trying to solve
 * global scope and modules
 * IIFE
 *
 * */
