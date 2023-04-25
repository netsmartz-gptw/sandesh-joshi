import { ITestResult } from 'app/entities/TestOpsCtrl/api-test/model/test-result.model';

export interface IApiResponseHeader {
  id?: number;
  key?: string;
  value?: string | null;
  testResult?: ITestResult;
}

export class ApiResponseHeader implements IApiResponseHeader {
  constructor(public id?: number, public key?: string, public value?: string | null, public testResult?: ITestResult) {}
}

export function getApiResponseHeaderIdentifier(apiResponseHeader: IApiResponseHeader): number | undefined {
  return apiResponseHeader.id;
}
