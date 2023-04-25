import dayjs from 'dayjs/esm';
import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';

export interface IApiRequestCookie {
  id?: number;
  name?: string;
  value?: string | null;
  remarks?: string | null;
  domain?: string | null;
  path?: string | null;
  version?: number | null;
  maxAge?: number;
  httpOnly?: boolean;
  secured?: boolean;
  expiryDate?: dayjs.Dayjs | null;
  apiRequest?: IApiRequest;
}

export class ApiRequestCookie implements IApiRequestCookie {
  constructor(
    public id?: number,
    public name?: string,
    public value?: string | null,
    public remarks?: string | null,
    public domain?: string | null,
    public path?: string | null,
    public version?: number | null,
    public maxAge?: number,
    public httpOnly?: boolean,
    public secured?: boolean,
    public expiryDate?: dayjs.Dayjs | null,
    public apiRequest?: IApiRequest
  ) {
    this.httpOnly = this.httpOnly ?? false;
    this.secured = this.secured ?? false;
  }
}

export function getApiRequestCookieIdentifier(apiRequestCookie: IApiRequestCookie): number | undefined {
  return apiRequestCookie.id;
}
