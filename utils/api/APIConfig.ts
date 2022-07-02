export const InternalError = {
  description: "Internal Error during request.",
  status_code: -500
}

// eslint-disable-next-line no-shadow
export enum APIStatus { IDLE, PENDING, REJECTED, FULFILLED };

export type APIError = {
  description: string,
  status_code: number;
}

export type APIData<DataType = any> = {
  status: APIStatus,
  error?: APIError,
  data?: any,
}
