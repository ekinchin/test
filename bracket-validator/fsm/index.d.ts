export type OpenedKinds = "A" | "C" | "E";
export type ClosedKinds = "B" | "D" | "F";

export type Kinds = OpenedKinds | ClosedKinds | "START";

export interface IState {
  name: Kinds;
  counters: Record<OpenedKinds, number>;
}

export class State implements IState {
  name: Kinds;
  counters: Record<OpenedKinds, number>;
}

export class StateError {
  error: true;
}

export type CreateState = () => State;

export type Translate = (char: string) => Kinds | "";
export type CalcNextState = (char: string, state: State) => State | StateError;

export type ToState = (state: State) => State | StateError;
export type ToStates = Record<Kinds, ToState>;

export type Transition = (char: string, state: State) => State | StateError;
export type Transitions = Record<Kinds, Transition>;
export type TransitionFactory = (state: State) => Transition;

export function validate(data: string): boolean;
