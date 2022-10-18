import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  // type predicate function
  // match 返回 true, otherwise undefined
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// 为action 添加2个属性：type 和 match方法
// match(inport action) 在reducer中调用match，check收到方法的type和reducer能接受的方法是否相同
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

//T:action type
//P:palyload type
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
export type Action<T> = {
  type: T;
};

//function overloading: many fun have same name, but different type of params

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;
// overloading fun的实现
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
