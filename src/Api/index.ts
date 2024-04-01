import { toast } from "react-toastify";

export function fetchRequest(
  url: string,
  token: string,
  method: 'post' | 'get' | 'put' | 'delete',
  body?: any,
  headers?: Headers,
): Promise<any> {
  const requestHeaders: any = {
    method,
    headers: checkAndAppendHeaders(headers!, token, body),
  };
  if (body) {
    requestHeaders.body =
      body instanceof FormData ? body : JSON.stringify(body);
  }
  return fetch(url, requestHeaders).then(handleResponse);
}

export function checkAndAppendHeaders(
  headers: Headers,
  token: string,
  body?: any,
): Headers {
  if (!headers) {
    headers = new Headers();
  }
  if (token) {
    headers.set('Authorization', token);
  }
  if (!body || (body && !(body instanceof FormData))) {
    if (!headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }
  return headers;
}

export function generateUrlWithRequestParams(
  url: string,
  requestParams: { [key: string]: any },
): string {
  Object.keys(requestParams).forEach((key: string) => {
    url = url.replace(`:${key}`, encodeURIComponent(requestParams[key]));
  });
  return url;
}

export function generateQueryParamsString(queryParams: {
  [key: string]: any;
}): string {
  let query = '';
  const queryParamsKeys = Object.keys(queryParams);
  Object.keys(queryParams).forEach((key: string, index: number) => {
    query += `${key}=${encodeURIComponent(queryParams[key])}`;
    if (index < queryParamsKeys.length - 1) {
      query += `&`;
    }
  });
  return query;
}

function handleResponse(response: Response) {
  return new Promise((resolve, reject) => {
    if (response.status === 401) {
      localStorage.clear();
      window.location.reload();
      response
        .json()
        .then((json) => {
          toast.error(json.message || 'Unauthorized');
          reject(json.message || 'Unauthorized');
        })
        .catch((error) => reject(error));
    } else if (response.status >= 200 && response.status < 300) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        response
          .json()
          .then((json) => {
            resolve(json);
          })
          .catch((error: any) => {
            toast.error(error);
            reject(error);
          });
      } else if (contentType && contentType.indexOf('text/html') !== -1) {
        response
          .text()
          .then((data) => {
            resolve(data);
          })
          .catch((error: any) => {
            toast.error(error);
            reject(error);
          });
      } else {
        resolve(response);
      }
    } else {
      response
        .json()
        .then((json) => {
          toast.error(json.message || json.error || 'Internal Server Error');
          reject(json.message || json.error || 'Internal Server Error');
        })
        .catch((error) => reject(error));
    }
  });
}

export function getFullUrl(
  baseUrl: string,
  endPoint: string,
  params?: { urlParams?: any; queryParams?: any },
): string {
  let url = `${baseUrl}${endPoint}`;
  if (params && params.urlParams) {
    url = generateUrlWithRequestParams(url, params.urlParams);
  }
  if (params && params.queryParams) {
    url = `${url}?${generateQueryParamsString(params.queryParams)}`;
  }
  return url;
}

export async function callApiWithRetries(
  retryCount: number,
  ...args: any
): Promise<any> {
  try {
    return await (fetchRequest as Function)(...args);
  } catch (error) {
    if (retryCount <= 0) throw error;
    return callApiWithRetries(retryCount - 1, ...args);
  }
}
