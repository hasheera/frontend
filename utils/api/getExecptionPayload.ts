import { APIError, InternalError } from './APIConfig';

const getExceptionPayload = (ex: unknown): APIError => {
  if(typeof ex !== "object" || !ex) {
    return InternalError;
  }

  const typedException = ex as APIError;
  if (Object.prototype.hasOwnProperty.call(ex, "description") && Object.prototype.hasOwnProperty.call(ex, "status_code")) {
    return {
      description: typedException.description,
      status_code: typedException.status_code
    }
  }

  return InternalError;
}

export default getExceptionPayload;
