import { Action, Reducer } from "redux";
export enum ActionType {
  UpdateCountries = "UPDATE_COUNTRIES",
  UpdateCountry = "UPDATE_COUNTRY",
}

export interface InitialState {
  countries: any;
  country:string
}
export const initialState: InitialState = {
  countries: [],
  country:"India"
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export const reducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action:any
) => {
  if (action.type === ActionType.UpdateCountries) {
    return { ...state, countries: action.payload.data };
  }
  if (action.type === ActionType.UpdateCountry) {
    return { ...state, country: action.payload.data };
  }  else return state;
};