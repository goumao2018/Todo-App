function expect(left) {
    return {
        toEqual: function(right) {
            if (JSON.stringify(left) !== JSON.stringify(right)) {
                throw new Error('Test failed\n'
                + 'Expected: ' + JSON.stringify(right) + '\n'
                + 'Received: ' + JSON.stringify(left) + '\n'
                )
            }
        },
    }
}

(function() {
    var delButton = yujinsSweetSweetTodoList.createDeleteButton(function(){});
    expect(delButton.type).toEqual('button')
    console.log('createDeleteButton() is a button element')
})();

(function() {
    var delButton = yujinsSweetSweetTodoList.createDeleteButton(function(){});
    isTrue('createDeleteButton() should be a button element', delButton.type === 'button');
})();




