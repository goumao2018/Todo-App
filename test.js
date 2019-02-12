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
        delete: true
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
  expect(filterTodos).toEqual([
    {
      id: 2,
      done: true,
      content: "study javascript",
      delete: false
    }
  ]);
  console.log(
    "filterTodos() should return an array of filtered todos when the filter is NONE"
  );
})();

(function() {
  let testState = {
    filter: "REMOVED",
    todos: [
      {
        id: 1,
        done: false,
        content: "sing a song",
        delete: true
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
  expect(filterTodos).toEqual([
    {
      id: 1,
      done: false,
      content: "sing a song",
      delete: true
    }
  ]);
  console.log(
    "filterTodos() should return an array of filtered todos when the filter is REMOVED"
  );
})();

(function() {
  let testState = {
    filter: "ACTIVE",
    todos: [
      {
        id: 1,
        done: false,
        content: "sing a song",
        delete: true
      },
      {
        id: 2,
        done: false,
        content: "study javascript",
        delete: false
      }
    ]
  };
  var filterTodos = yujinsSweetSweetTodoList.filterTodos(testState);
  // make this test pass
  expect(filterTodos).toEqual([
    {
      id: 2,
      done: false,
      content: "study javascript",
      delete: false
    }
  ]);
  console.log(
    "filterTodos() should return an array of filtered todos when the filter is ACTIVE"
  );
})();

(function() {
  let testState = {
    filter: "COMPLETED",
    todos: [
      {
        id: 1,
        done: true,
        content: "sing a song",
        delete: true
      },
      {
        id: 2,
        done: false,
        content: "study javascript",
        delete: false
      },
      {
        id: 3,
        done: true,
        content: "sing a song",
        delete: false
      }
    ]
  };
  var filterTodos = yujinsSweetSweetTodoList.filterTodos(testState);
  // make this test pass
  expect(filterTodos).toEqual([
    {
      id: 3,
      done: true,
      content: "sing a song",
      delete: false
    }
  ]);
  console.log(
    "filterTodos() should return an array of filtered todos when the filter is COMPLETED"
  );
})();
