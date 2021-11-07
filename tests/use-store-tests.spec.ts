import { renderHook, act } from '@testing-library/react-hooks'
import { Store } from '@tigon/state-manager';
import useStore from '../useStore';

describe("useStore tests", () => {

  test('useStore return', () => {
    const store = Store(0);
    const component = jest.fn(() => useStore(store));
    const { result } = renderHook(component);
    expect(component).toBeCalledTimes(1);

    const handler = result.current;
    expect(handler).toHaveLength(2);

    const [state, setState] = handler;
    expect(state).toEqual(0);
    expect(setState).toBeInstanceOf(Function);

    const originalHandler = store();
    expect(originalHandler).toStrictEqual(handler);
  });

  test('setState render', () => {
    const store = Store(0);
    const component = jest.fn(() => useStore(store));
    const { result } = renderHook(component);
    expect(component).toBeCalledTimes(1);

    const handler0 = result.current;
    const [state0, setState0] = handler0;
    expect(state0).toEqual(0);

    act(() => {
      setState0(1);
    });
    expect(component).toBeCalledTimes(2);

    const handler1 = result.current;
    const [state1, setState1] = handler1;
    expect(handler0).toStrictEqual(handler1);
    expect(state1).toEqual(1);
    expect(setState0).toStrictEqual(setState1);
  });

  test('setState outside render', () => {
    const store = Store(0);
    const component = jest.fn(() => useStore(store));
    const { result } = renderHook(component);
    expect(component).toBeCalledTimes(1);

    const handler0 = result.current;
    const [state0] = handler0;
    expect(state0).toEqual(0);

    act(() => {
      const [, setState] = store();
      setState(1);
    });
    expect(component).toBeCalledTimes(2);

    const handler1 = result.current;
    const [state1] = handler1;
    expect(handler0).toStrictEqual(handler1);
    expect(state1).toEqual(1);
  });

  test('setState from other component', () => {
    const store = Store(0);
    const component1 = jest.fn(() => useStore(store));
    const component2 = jest.fn(() => useStore(store));
    const { result: r1 } = renderHook(component1);
    const { result: r2 } = renderHook(component2);
    expect(component1).toBeCalledTimes(1);
    expect(component2).toBeCalledTimes(1);

    const handler_r1_0 = r1.current;
    const [state_r1_0, setState_r1] = handler_r1_0;
    expect(state_r1_0).toEqual(0);

    const handler_r2_0 = r2.current;
    const [state_r2_0] = handler_r2_0;
    expect(state_r2_0).toEqual(0);

    act(() => {
      setState_r1(1);
    });

    expect(component1).toBeCalledTimes(2);
    expect(component2).toBeCalledTimes(2);

    const handler_r1_1 = r1.current;
    const [state_r1_1] = handler_r1_1;
    expect(state_r1_1).toEqual(1);

    const handler_r2_1 = r2.current;
    const [state_r2_1] = handler_r2_1;
    expect(state_r2_1).toEqual(1);
  });

  test('setState render with detector', () => {
    const store = Store(0);
    const component = jest.fn(() => useStore(store, (state) => [state]));
    
    renderHook(component);
    expect(component).toBeCalledTimes(1);

    act(() => {
      const [, setState] = store();
      setState(1);
    });
    expect(component).toBeCalledTimes(2);

    act(() => {
      const [, setState] = store();
      setState(1);
    });
    expect(component).toBeCalledTimes(2);

    act(() => {
      const [, setState] = store();
      setState(2);
    });
    expect(component).toBeCalledTimes(3);
  });

  test('setState render with detector and random deps', () => {
    const store = Store({notDetected: 1, detected: 2});
    const component = jest.fn(() =>{
      useStore(store, ({detected}) => [detected], [Math.random()])
    });

    renderHook(component);
    expect(component).toBeCalledTimes(1);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        notDetected: 2,
      }));
    });
    expect(component).toBeCalledTimes(1);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        detected: 3,
      }));
    });
    expect(component).toBeCalledTimes(2);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        notDetected: 3,
      }));
    });
    expect(component).toBeCalledTimes(2);
  });

  test('setState render with toggled detector and toggled deps', () => {
    const store = Store({otherDetected: 1, detected: 2});
    let key = "otherDetected"
    const useToggle = ()=>key === "detected" ? (key = "otherDetected") : (key = "detected");
    const component = jest.fn(() =>{
      const key = useToggle();
      useStore(store, (state) => [state[key]], [key]);
    });

    renderHook(component);
    expect(component).toBeCalledTimes(1);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        otherDetected: 2,
      }));
    });
    expect(component).toBeCalledTimes(1);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        detected: 3,
      }));
    });
    expect(component).toBeCalledTimes(2);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        otherDetected: 3,
      }));
    });
    expect(component).toBeCalledTimes(3);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        otherDetected: 4,
      }));
    });
    expect(component).toBeCalledTimes(3);

    act(() => {
      const [, setState] = store();
      setState((state)=>({
        ...state,
        detected: 3,
      }));
    });
    expect(component).toBeCalledTimes(3);
  });

});
