import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useMemo,
} from 'react';

interface Action {
  type: string,
  payload?: any,
}

interface AppState {
  loadingModal: boolean,
  dispatcher: ReturnType<typeof dispatcher>,
}

const APP_STORE_LOADING_MODAL_UPDATE = 'APP_STORE_LOADING_MODAL_UPDATE';

const dispatcher = (dispatch: Dispatch<Action>): any => ({
  loadingModalUpdate: (payload: boolean) => dispatch({
    type: APP_STORE_LOADING_MODAL_UPDATE,
    payload,
  }),
});

export const appInitialState: AppState = {
  loadingModal: false,
  dispatcher: {},
};

const storeContext = createContext(appInitialState);
const { Provider } = storeContext;

export const appReducer = (reducerState: AppState, action: Action) => {
  switch (action.type) {
    case APP_STORE_LOADING_MODAL_UPDATE: {
      return { ...reducerState, loadingModal: action.payload };
    }
    default:
      return { ...reducerState };
  }
};

interface AppStateWrapperProps {
  initialState: AppState,
  children: ReactNode,
}

const AppStateWrapper = ({ initialState, children }: AppStateWrapperProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => ({
    ...state,
    dispatcher: dispatcher(dispatch),
  }), [state, dispatch]);

  return (
    <Provider
      value={contextValue}
    >
      {children}
    </Provider>
  );
};

export { storeContext, AppStateWrapper };
