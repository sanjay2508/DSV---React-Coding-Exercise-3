export function reducer(
  state: { count: number },
  action: {
    payload?: number;
    type: any;
  }
) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: Math.max(0, state.count - 1) };
    case "incrementBy":
      const userIncrement = action.payload || 0;
      return { count: Math.max(0, state.count + userIncrement) };
    case "incrementToNearestOdd":
      const isCurrentOdd = state.count % 2 !== 0;
      const nextOdd = isCurrentOdd ? state.count + 2 : state.count + 1;
      return { count: Math.max(0, nextOdd) };
    case "decrementByInput":
      const userDecrement = action.payload || 0;
      return { count: Math.max(0, state.count - userDecrement) };
    case "reset":
      const newCount = action.payload || 0;
      return { count: Math.max(0, newCount) };
    default:
      throw new Error();
  }
}
