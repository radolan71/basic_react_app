import { origin } from "../helpers/originHelper";
import { doRequest } from "../helpers/requestHelper";

export const getConfig = (): any => {
  return doRequest("GET", `${origin}/config.json`);
};
