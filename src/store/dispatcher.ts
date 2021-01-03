import { ActionType } from "./reducer";

const updateCountries = (data: any) => {
  return { type: ActionType.UpdateCountries, payload: { data } };
};
const updateCountry = (data: any) => {
  return { type: ActionType.UpdateCountry, payload: { data } };
};
export {
  updateCountries,
  updateCountry,
};