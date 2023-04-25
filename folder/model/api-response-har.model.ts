import { ITestResult } from 'app/entities/TestOpsCtrl/api-test/model/test-result.model';

export interface IApiResponseHar {
  id?: number;
  log?: string | null;
  testResult?: ITestResult;
}

export class ApiResponseHar implements IApiResponseHar {
  constructor(public id?: number, public log?: string | null, public testResult?: ITestResult) {}
}

export function getApiResponseHarIdentifier(apiResponseHar: IApiResponseHar): number | undefined {
  return apiResponseHar.id;
}
