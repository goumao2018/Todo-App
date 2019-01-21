
var yujinsSweetSweetTodoList = (function() {
    var count = 0;
    var state = [
        {
            id: 1,
            done: false,
            content: 'sing a song',
        },
        {
            id: 2,
            done: false,
            content: 'study javascript',
        },
        {
            id: 3,
            done: true,
            content: 'drink coffee',
        },
        {
            id: 4,
            done: false,
            content: 'farewell Bob at lawn bowls',
        },
    ];
    var rootElement = document.getElementById('root');
    var formElement = document.getElementById('form');
    var inputElement = document.getElementById('addTodoInput');
    var completedBtn = document.getElementById('completedBtn');
    var nextId = 999;

    // functions that return values
    function createCheckboxElement(todo){
        var checkboxElement = document.createElement('INPUT');
        checkboxElement.id = todo.id;
        checkboxElement.type = "checkbox";
        checkboxElement.checked = todo.done; 
        checkboxElement.addEventListener('change', handleDoneTodo)
        return checkboxElement;
    }

    function createLabelElement(todo) {
        var labelElement = document.createElement('label');
        labelElement.htmlFor = todo.id;
        labelElement.innerText = todo.content;
        if (todo.done === true){
            var str = labelElement.innerText;
            var result = str.strike(); 
            labelElement.innerHTML=result;
        }
        return labelElement;
    }

    function createDeleteButton(eventHandler) {
        var deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerText = 'x';
        deleteButton.addEventListener('click', eventHandler);
        return deleteButton;
    }

    function createListElement(todo) {
        var listElement = document.createElement('li');
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
        }
        nextId++;
        state.push(newTodo);

        render(state);

        formElement.reset();
    }
    

    function handleDoneTodo(event) {
        console.log(event.target.id, typeof event.target.id );
        var labelElementId = Number(event.target.id);
        state.forEach(function(todo) {
            if (todo.id === labelElementId) {
                todo.done = !todo.done;
            }
        });
        
        render(state);
    }

    function handleDeleteTodo(event) {
        event.preventDefault();
        var listElement = event.target.parentElement;
        var labelElement = listElement.querySelector('label');
        var todoId = Number(labelElement.htmlFor);
        function findTodoById(item){
            return item.id === todoId;
        }
        var todoIndex = state.findIndex(findTodoById);
        state.splice(todoIndex,1)
        render(state);
    }

    function filterCompletedTodo() {
        var filteredTodos = state.filter(function(todo) {
            if(todo.done) {
                return todo
            }
        });
        render(filteredTodos);
    }

    function render(todos) {
        rootElement.innerHTML = '';
        todos.forEach(function(todo){    
            rootElement.appendChild(createListElement(todo));
        })       
    };

    render(state);

    formElement.addEventListener('submit', handleSubmit);
    completedBtn.addEventListener('click', filterCompletedTodo)

    return {
        createCheckboxElement: createCheckboxElement,
        createLabelElement: createLabelElement,
        createDeleteButton: createDeleteButton,
        createListElement: createListElement,
    }

})();



/** 
 * TODO: 
 * styles
 * write tests
 * add filters
 * */ 
