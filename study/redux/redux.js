
const counter = {
  count: 0,
};
const info = {
  name: 'www',
  description: 'hello！',
};

/* counterReducer, 一个子reducer */
/* 注意：counterReducer 接收的 state 是 state.counter */
function counterReducer(state = counter, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
/* InfoReducer，一个子reducer */
/* 注意：InfoReducer 接收的 state 是 state.info */
function InfoReducer(state = info, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}

function combineReducers(reducers) {
  /* reducerKeys = ['counter', 'info'] */
  const reducerKeys = Object.keys(reducers);

  /* 返回合并后的新的reducer函数 */
  return function combination(state = {}, action) {
    /* 生成的新的state */
    const nextState = {};

    /* 遍历执行所有的reducers，整合成为一个新的state */
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      /* 之前的 key 的 state */
      const previousStateForKey = state[key];
      /* 执行 分 reducer，获得新的state */
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

const createStore = function (reducer, initState) {
  let state = initState;
  const listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((v) => {
      v();
    });
  }

  function getState() {
    return state;
  }

  dispatch({ type: Symbol() });

  return {
    subscribe,
    dispatch,
    getState,
  };
};

// let initState = {
//   counter: {
//     count: 0
//   },
//   info: {
//     name: '前端九部',
//     description: '我们都是前端爱好者！'
//   }
// };

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer,
});

const store = createStore(reducer);
store.subscribe(() => {
  // let state = store.getState();
  // console.log(state,state.counter.count);
});
store.dispatch({
  type: 'INCREMENT',
});
console.dir(store.getState());
