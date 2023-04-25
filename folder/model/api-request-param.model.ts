import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';

export interface IApiRequestParam {
  id?: number;
  key?: string;
  value?: string | null;
  description?: string | null;
  active?: boolean;
  apiRequest?: IApiRequest;
}

export class ApiRequestParam implements IApiRequestParam {
  constructor(
    public id?: number,
    public key?: string,
    public value?: string | null,
    public description?: string | null,
    public active?: boolean,
    public apiRequest?: IApiRequest
  ) {
    this.active = this.active ?? false;
  }
}

export function getApiRequestParamIdentifier(apiRequestParam: IApiRequestParam): number | undefined {
  return apiRequestParam.id;
}
