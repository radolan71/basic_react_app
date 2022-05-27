export enum RequestState {
  NotRequested = "NotRequested",
  InProgress = "InProgress",
  Finished = "Finished",
  Failed = "Failed",
}

export const isNotRequested = (request: any) =>
  !request ||
  !request.requestState ||
  request.requestState === RequestState.NotRequested;
export const isInProgress = (request: any) =>
  request && request.requestState === RequestState.InProgress;
export const isFinished = (request: any) =>
  request && request.requestState === RequestState.Finished;
export const isFailed = (request: any) =>
  request && request.requestState === RequestState.Failed;
export const isLoading = (request: any) =>
  isNotRequested(request) || isInProgress(request);

const getHeaders = (params: any) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...params,
  };

  return headers;
};

/**
 * Calls the Campaigns Manager API
 * @param  {String} method
 * @param  {String} uri
 * @param  {Object} data
 * @param  {Object} options
 * @param  {Object} options.headers
 *
 * @return {Promise}
 */
export const doRequest = async (
  method: string,
  uri: string,
  data: Record<string, any> | null = null,
  { headers = {} } = {}
): Promise<any> => {
  const options: RequestInit = {
    method,
    headers: getHeaders(headers),
    mode: "cors",
    cache: "default",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(uri, options);

  if (!response.ok) {
    throw new Error(`Unable to call api ${uri}`);
  }
  const responseCopy = response.clone();
  return response.status !== 204
    ? responseCopy.json().catch((_) => response.text())
    : {};
};
