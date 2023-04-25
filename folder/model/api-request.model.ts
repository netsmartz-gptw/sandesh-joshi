import { IProject } from 'app/entities/TestOpsCtrl/api-request/model/project.model';
import { ArchitectureType } from 'app/entities/enumerations/architecture-type.model';
import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { ApiSource } from 'app/entities/enumerations/api-source.model';
import { AuthType } from 'app/entities/enumerations/auth-type.model';
import { IncludeKeyAs } from 'app/entities/enumerations/include-key-as.model';
import { BodyType } from 'app/entities/enumerations/body-type.model';
import { RawType } from 'app/entities/enumerations/raw-type.model';
import { IApiCollections } from './api-collections.model';

export interface IApiRequest {
  id?: number;
  architecture?: ArchitectureType;
  method?: HttpMethod;
  source?: ApiSource;
  url?: string;
  description?: string | null;
  name?: string;
  entityName?: string | null;
  postScript?: string | null;
  preScript?: string | null;
  assertion?: string | null;
  authType?: AuthType;
  authKey?: string | null;
  authValue?: string | null;
  includeKeyAs?: IncludeKeyAs | null;
  username?: string | null;
  password?: string | null;
  token?: string | null;
  consumerKey?: string | null;
  consumerSecret?: string | null;
  tokenSecret?: string | null;
  workstation?: string | null;
  domain?: string | null;
  host?: string | null;
  port?: number | null;
  bodyType?: BodyType;
  rawText?: string | null;
  rawType?: RawType | null;
  binaryContentType?: string | null;
  binary?: string | null;
  binaryName?: string | null;
  graphQlQuery?: string | null;
  project?: IProject;
  apiCollections?: IApiCollections;
  result?: any;
  selected?: boolean;
}

export class ApiRequest implements IApiRequest {
  constructor(
    public id?: number,
    public architecture?: ArchitectureType,
    public method?: HttpMethod,
    public source?: ApiSource,
    public url?: string,
    public description?: string | null,
    public name?: string,
    public entityName?: string | null,
    public postScript?: string | null,
    public preScript?: string | null,
    public assertion?: string | null,
    public authType?: AuthType,
    public authKey?: string | null,
    public authValue?: string | null,
    public includeKeyAs?: IncludeKeyAs | null,
    public username?: string | null,
    public password?: string | null,
    public token?: string | null,
    public consumerKey?: string | null,
    public consumerSecret?: string | null,
    public tokenSecret?: string | null,
    public workstation?: string | null,
    public domain?: string | null,
    public host?: string | null,
    public port?: number | null,
    public bodyType?: BodyType,
    public rawText?: string | null,
    public rawType?: RawType | null,
    public binaryContentType?: string | null,
    public binary?: string | null,
    public binaryName?: string | null,
    public graphQlQuery?: string | null,
    public project?: IProject,
    public apiCollections?: IApiCollections,
    public result?: any
  ) {}
}

export function getApiRequestIdentifier(apiRequest: IApiRequest): number | undefined {
  return apiRequest.id;
}
