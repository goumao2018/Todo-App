
(function() {
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
    var checkboxStatus = document.getElementsByTagName('INPUT');
    var nextId = 999;

    // functions that return values

    // functions that have side effects

    function handleSubmit(event) {
        event.preventDefault();
        var newTodo = {
            id: nextId,
            done: false,
            content: inputElement.value,
        }
        nextId++;
        state.push(newTodo);

        render();

    }
    
    function renderTodo(todo) {
        var listElement = document.createElement('li');
        var checkboxElement = document.createElement('INPUT');
        checkboxElement.id = todo.id;
        checkboxElement.type = "checkbox";
        checkboxElement.checked = todo.done; 

        var labelElement = document.createElement('label');
        labelElement.htmlFor = todo.id;
        labelElement.innerText = todo.content;

        var deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerText = 'x';
        deleteButton.addEventListener('click', handleDeleteTodo);
        
        rootElement.appendChild(listElement);
        listElement.appendChild(checkboxElement);
        listElement.appendChild(labelElement);
        listElement.appendChild(deleteButton);

        
    }
    function handleDeleteTodo(event) {
        event.preventDefault();
        var listElement = event.target.parentElement;
        // rootElement.removeChild(listElement);
        var labelElement = listElement.querySelector('label');
        var todoId = Number(labelElement.htmlFor);
        function findTodoById(item){
            return item.id === todoId;
        }
        var todoIndex = state.findIndex(findTodoById);
        state.splice(todoIndex,1)
        render();
    }

    function render() {
        rootElement.innerHTML = '';
        state.forEach(function(todo){
            renderTodo(todo);     
        })       
    };

    render();


    // function testfunction(){
    //     // var test = document.querySelectorAll("li");
    //     // var test1 = test[1].getAttribute("checked");
    //     console.log('hey');
            
    // }

    // testfunction();

    // document.getElementById('todoStatus').addEventListener('click', changeTodoStatus);
    formElement.addEventListener('submit', handleSubmit);

    // document.getElementById('woo').addEventListener('click', testfunction)


})();



/** 
 * TODO: 
 * ---Add delete button
 * styles
 * striketrhough for done items
 * write tests
 * */ 
