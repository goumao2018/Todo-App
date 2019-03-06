/* 
redux:
- createStore() -> used to configure and initialise the state
const store = createStore(state, reducer)

- getState()  

- dispatch() -> sends messages (name and a payload) to update the state
message = {
  type: 'ADD_TODO',
  payload: { content: 'Call mum' },
}

*/

secretState = {};
reducer = somefunc;

function redux(action) {
  secretState = reducer(secretState, action);
}