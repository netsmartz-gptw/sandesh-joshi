import { IAuthCatalog } from 'app/entities/TestOpsCtrl/auth-catalog/model/auth-catalog.model';
import { ApiSource } from 'app/entities/enumerations/api-source.model';
import dayjs from 'dayjs/esm';
export interface IApiCollections {
  id?: number;
  name?: string | null;
  description?: string | null;
  type?: ApiSource | null;
  authCatalog?: IAuthCatalog | null;
  active?: boolean | null;
  isFavourite?: boolean | null;
  versions?: [] | null;
  architecture?: any;
  lastExecutionDate?: dayjs.Dayjs | null;
  lastUpdated?: dayjs.Dayjs | null;
}

export class ApiCollections implements IApiCollections {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public type?: ApiSource | null,
    public authCatalog?: IAuthCatalog | null,
    public active?: boolean | null,
    public isFavourite?: boolean | null,
    public versions?: [] | null,
    public architecture?: any,
    public lastExecutionDate?: dayjs.Dayjs | null,
    public lastUpdated?: dayjs.Dayjs | null
  ) {}
}

export function getApiCollectionsIdentifier(apiCollections: IApiCollections): number | undefined {
  return apiCollections.id;
}
