'use strict';
/**
 * Reducer - Função pura que recebe o estado atual da APLICAÇÃO
 * e uma ação e retorna um novo estado - (state, action) => state
 */

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
  }
  return state;
}

/**
 * (createStore) - É o objeto principal aonde vai ficar
 * todo o estado da aplicação
 */
// const {
//   createStore
// } = Redux;

/**
 * createStore(reducer)
 * retorna (
 *  dispatch (Vai disparar uma ação),
 *  getState (Vai trazer o dado atual salvo na store),
 *  subscribe (Recebe uma função que vai ser disparada toda vez que uma função é disparada),
 * )
 */

// const store = createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * Criando o seu proprio (createStore)
 */

const createStore = (reducer) => {
  let state;
  let subscriptions = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    subscriptions.forEach(f => f());
  }

  const subscribe = (func) => {
    subscriptions.push(func);
    return () => {
      subscriptions = subscriptions.filter(f => f !== func);
    }
  }

  dispatch({});

  return {
    getState: () => state,
    dispatch,
    subscribe,
  }

}

const store = createStore(counter);

const $buttonIncrement = document.querySelector('[data-js="increment"]');
const $buttonDecrement = document.querySelector('[data-js="decrement"]');
const $counter = document.querySelector('[data-js="counter"]');
const unsubscribe = store.subscribe(render); // Remove a função que estamos inscrito

store.subscribe(render);

$buttonIncrement.addEventListener('click', increment, false);

$buttonDecrement.addEventListener('click', decrement, false);

function increment() {
  store.dispatch({
    type: 'INCREMENT'
  });
}

function decrement() {
  store.dispatch({
    type: 'DECREMENT'
  });
}

function render() {
  $counter.innerHTML = store.getState();
}

// setTimeout(() => {
//   unsubscribe();
// }, 5000)

render();
