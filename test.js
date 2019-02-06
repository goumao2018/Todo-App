function expect(left) {
  return {
    toEqual: function(right) {
      if (JSON.stringify(left) !== JSON.stringify(right)) {
        throw new Error(
          "Test failed\n" +
            "Expected: " +
            JSON.stringify(right) +
            "\n" +
            "Received: " +
            JSON.stringify(left) +
            "\n"
        );
      }
    }
  };
}

(function() {
  var delButton = yujinsSweetSweetTodoList.createDeleteButton(function() {});
  expect(delButton.type).toEqual("button");
  console.log("createDeleteButton() is a button element");
})();

// (function() {
//   var delButton = yujinsSweetSweetTodoList.createDeleteButton(function() {});
//   // make this test pass
//   expect(true).toEqual(true);
//   console.log("createDeleteButton() should be a button element");
// })();

(function() {
  let testState = {
    filter: "NONE",
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
      }
    ]
  };
  var filterTodos = yujinsSweetSweetTodoList.filterTodos(testState);
  // make this test pass
  expect(Array.isArray(filterTodos)).toEqual(true);
  console.log("filterTodos() should return an array of filtered todos");
})();
