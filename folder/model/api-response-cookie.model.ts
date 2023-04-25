import dayjs from 'dayjs/esm';
import { ITestResult } from 'app/entities/TestOpsCtrl/api-test/model/test-result.model';

export interface IApiResponseCookie {
  id?: number;
  name?: string;
  value?: string | null;
  remarks?: string | null;
  domain?: string | null;
  path?: string | null;
  version?: number | null;
  maxAge?: number | null;
  httpOnly?: boolean;
  secured?: boolean;
  expiryDate?: dayjs.Dayjs | null;
  testResult?: ITestResult;
}

export class ApiResponseCookie implements IApiResponseCookie {
  constructor(
    public id?: number,
    public name?: string,
    public value?: string | null,
    public remarks?: string | null,
    public domain?: string | null,
    public path?: string | null,
    public version?: number | null,
    public maxAge?: number | null,
    public httpOnly?: boolean,
    public secured?: boolean,
    public expiryDate?: dayjs.Dayjs | null,
    public testResult?: ITestResult
  ) {
    this.httpOnly = this.httpOnly ?? false;
    this.secured = this.secured ?? false;
  }
}

export function getApiResponseCookieIdentifier(apiResponseCookie: IApiResponseCookie): number | undefined {
  return apiResponseCookie.id;
}
