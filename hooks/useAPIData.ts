import { APIData, APIError, APIStatus } from '@utils/api/APIConfig';
import { useEffect } from 'react';

export const unhandledError = {
  description: "Cannot handle error data",
  status_code: -400
};

export const useAPIData = <DataType>(
  response: APIData<DataType>,
  handlers: {
    onFulfilled?: (data: DataType) => void,
    onRejected?: (data: APIError) => void,
    onPending?: () => void
  }) => {
  const { onFulfilled, onRejected, onPending } = handlers;

  useEffect(() => {
    if(response.status === APIStatus.REJECTED && onRejected ) {
      onRejected(response.error ||unhandledError);
    }
  }, [response.status, response.error, onRejected])

  useEffect(() => {
    if(response.status === APIStatus.FULFILLED && onFulfilled ) {
      onFulfilled(response.data);
    }
  }, [response.status, response.data, onFulfilled])

  useEffect(() => {
    if(response.status === APIStatus.PENDING && onPending ) {
      onPending();
    }
  }, [response.status, onPending])
}
