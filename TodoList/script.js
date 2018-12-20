
(function() {
    var state = [
        {
            done: false,
            content: 'sing a song',
        },
        {
            done: false,
            content: 'study javascript',
        },
        {
            done: true,
            content: 'drink coffee',
        },
        {
            done: false,
            content: 'farewell Bob at lawn bowls',
        },
    ];
    var rootElement = document.getElementById('root');
    var formElement = document.getElementById('form');
    var inputElement = document.getElementById('addTodoInput');

    // functions that return values

    // functions that have side effects

    function handleSubmit(event) {
        event.preventDefault();
        var newTodo = {
            done: false,
            content: inputElement.value,
        }
        state.push(newTodo);
        rootElement.innerHTML = '';

        render();
    }

    
    function addTodo(content) {
        var listElement = document.createElement('li');
        listElement.innerHTML = content;
        rootElement.appendChild(listElement);
    }
    
    function render() {
        state.forEach(function(todo){
            addTodo(todo.content);
  
        })
    };

    render();

    formElement.addEventListener('submit', handleSubmit);

})();



/** 
 * TODO: 
 * Add delete button
 * styles
 * checkboxs (done/not done)
 * striketrhough for done items
 * write tests
 * */ 
