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

const CACHE_EXPIRE_HEADER = "X-Cache-Expires";

const getHeaders = (params: any) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...params,
  };

  return headers;
};

/**
 * Caches a Response using the Cache API
 * @async
 * @param string   cacheKey
 * @param string   requestPath
 * @param Response response
 * @param number   cacheDuration
 */
const cacheResponse = async (
  cacheKey: string,
  requestPath: string,
  response: Response,
  cacheDuration: number
) => {
  // Checks if the browser supports the Cache API
  if (!("caches" in window)) {
    return;
  }

  // Response can only be consumed once
  // cloning it to re-use it and avoid tampering the original one
  const clonedResponse = response.clone();

  // Set the expiration time to the response header
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + cacheDuration);

  // Re-create the response, by copying all the properties of the cloned response
  const cachedResponseFields = {
    ...clonedResponse,
    headers: {
      ...clonedResponse.headers,
      [CACHE_EXPIRE_HEADER]: expires.toUTCString(),
    },
  };
  const responseBody = await clonedResponse.blob();

  // Stores the response in the Cache
  const cache = await window.caches.open(cacheKey);
  cache.put(requestPath, new Response(responseBody, cachedResponseFields));
};

/**
 * Retrieves a response from the cache
 * @async
 * @param  string cacheKey
 * @param  string requestPath
 * @return Response | null
 */
const getCachedResponse = async (cacheKey: string, requestPath: string) => {
  // Checks if the browser supports the Cache API
  if (!("caches" in window)) {
    return null;
  }

  const cache = await window.caches.open(cacheKey);
  const cachedResponse = await cache.match(requestPath);

  if (!cachedResponse) {
    return null;
  }

  // Validate if the cache is stale
  const now = new Date();
  const expirationDate = new Date(
    cachedResponse.headers.get(CACHE_EXPIRE_HEADER) || ""
  );
  if (expirationDate < now) {
    await window.caches.delete(requestPath);
    return null;
  }

  cachedResponse.headers.delete(CACHE_EXPIRE_HEADER);
  return cachedResponse;
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
  { headers = {}, cacheKey = "", cacheDuration = 3600 } = {}
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

  let response: Response | null = null;
  if (cacheKey) {
    response = await getCachedResponse(cacheKey, uri);
  }

  if (!response) {
    response = await fetch(uri, options);
    if (cacheKey && response.ok) {
      await cacheResponse(cacheKey, uri, response, cacheDuration);
    }
  }

  if (!response.ok) {
    throw new Error(`Unable to call api ${uri}`);
  }
  const responseCopy = response.clone();
  return response.status !== 204
    ? responseCopy.json().catch((_) => response?.text())
    : {};
};
