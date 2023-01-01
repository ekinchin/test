/**
 * @typedef {import('./index').CreateState} CreateState
 * @typedef {import('./index').ToStates} ToStates
 * @typedef {import('./index').Translate} Translate
 * @typedef {import('./index').CalcNextState} CalcNextState
 * @typedef {import('./index').Transitions} Transitions
 * @typedef {import('./index').TransitionFactory} TransitionFactory
 * @typedef {import('./index').Kinds} Kinds
 * @typedef {import('./index').IState} IState
 * @typedef {import('./index').validate} validate
 */

/**
 * @implements {IState}
 * @type {import('./index').State} State
 * */
class State {
  /**
   * @type {Kinds}
   */
  name = "START";

  counters = {
    A: 0,
    C: 0,
    E: 0,
  };
}

/**
 * * @type {import('./index').StateError} StateError
 */
class StateError {
  /**
   * @type {true}
   */
  error = true;
}
/**
 * @type {CreateState}
 */
const createState = () => new State();

/**
 * @type {ToStates}
 */
const toStates = {
  START: () => new StateError(),
  A: (state) => {
    state.name = "A";
    state.counters.A += 1;
    return state;
  },
  B: (state) => {
    state.name = "B";
    state.counters.A -= 1;
    return state.counters.A >= 0 ? state : new StateError();
  },
  C: (state) => {
    state.name = "C";
    state.counters.C += 1;
    return state;
  },
  D: (state) => {
    state.name = "D";
    state.counters.C -= 1;
    return state.counters.C >= 0 ? state : new StateError();
  },
  E: (state) => {
    state.name = "E";
    state.counters.E += 1;
    return state;
  },
  F: (state) => {
    state.name = "F";
    state.counters.E -= 1;
    return state.counters.E >= 0 ? state : new StateError();
  },
};

/**
 * @type {Translate}
 */
const translate = (char) => {
  switch (char) {
    case "(":
      return "A";
    case ")":
      return "B";
    case "[":
      return "C";
    case "]":
      return "D";
    case "<":
      return "E";
    case ">":
      return "F";
    default:
      return "";
  }
};

/**
 * @type {CalcNextState}
 */
const calcNextState = (char, state) => {
  const toState = toStates[char];
  return toState ? toState(state) : state;
};

/**
 * from - to
 * @type {Transitions}
 */
const transitions = {
  START: (char, state) => calcNextState(char, state),
  A: (char, state) => {
    if (["D", "F"].includes(char)) return new StateError();
    return calcNextState(char, state);
  },
  B: (char, state) => {
    if (["C", "E"].includes(char)) return new StateError();
    return calcNextState(char, state);
  },
  C: (char, state) => {
    if (["B", "F"].includes(char)) return new StateError();
    return calcNextState(char, state);
  },
  D: (char, state) => {
    if (["A", "E"].includes(char)) return new StateError();
    return calcNextState(char, state);
  },
  E: (char, state) => {
    if (["B", "D"].includes(char)) return new StateError();
    return calcNextState(char, state);
  },
  F: (char, state) => {
    if (["A", "C"].includes(char)) return new StateError();
    return calcNextState(char, state);
  },
};

/**
 * return current state's transition rule
 * @type {TransitionFactory}
 */
const transitionFactory = (state) => transitions[state.name];

/**
 * @type {validate}
 */
export function validate(data) {
  let state = createState();
  for (const char of data) {
    const transition = transitionFactory(state);
    state = transition(translate(char), state);
    if (state instanceof StateError) return false;
  }
  return !state.counters.A && !state.counters.C && !state.counters.E;
}
