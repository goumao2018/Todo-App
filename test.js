function expect(left) {
  return {
    toEqual: function (right) {
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

(function () {
  var todo = {
    id: 1,
    done: false,
    content: "sing a song",
    delete: true
  }
  var checkbox = yujinsSweetSweetTodoList.createCheckboxElement(todo);
  expect(checkbox.type).toEqual("checkbox");
  expect(checkbox.id).toEqual("1");
  console.log("createCheckboxElement() is a checkbox element");
})();

(function () {
  var todo = {
    id: 1,
    done: false,
    content: "sing a song",
    delete: true
  }
  var label = yujinsSweetSweetTodoList.createLabelElement(todo);
  expect(label.nodeName).toEqual("LABEL");
  expect(label.innerText).toEqual("sing a song")
  console.log("createLabelElement() is a label element and displays todo contents");
})();

(function () {
  var count = 0;
  function addOne() {
    // update the count
    count = count + 1;
  };
  // create button
  var delButton = yujinsSweetSweetTodoList.createDeleteButton(addOne);

  // click button
  delButton.click()

  // expect the button was created
  expect(delButton.type).toEqual("button");

  // expect the handler was clicked
  expect(count).toEqual(1)
  // todo

  console.log("createDeleteButton() is a button element");
})();

(function () {
  let todo = {
    id: 1,
    done: false,
    content: "sing a song",
    delete: true
  }
  var list = yujinsSweetSweetTodoList.createListElement(todo);
  expect(list.nodeName).toEqual("LI");
  console.log("createListElement() is a list element");
})();

(function () {
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

(function () {
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

(function () {
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

(function () {
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
