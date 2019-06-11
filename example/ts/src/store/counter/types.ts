export interface CounterState {
  count: number;
}

export interface CounterGetters {
  // getterName: returnType
  half: number;
}

export interface CounterMutations {
  // mutationName: mutationPayloadType
  inc: {
    amount: number;
  };
}

export interface CounterActions {
  // actionName: actionPayloadType
  incAsync: {
    amount: number;
    delay: number;
  };
}
