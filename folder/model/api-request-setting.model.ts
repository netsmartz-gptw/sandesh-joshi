import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';
import { HttpScheme } from 'app/entities/enumerations/http-scheme.model';

export interface IApiRequestSetting {
  id?: number;
  showConsole?: boolean;
  followRedirects?: boolean;
  redirectAutomatically?: boolean;
  useKeepAlive?: boolean;
  encodeUrlAutomatically?: boolean;
  enableSslCertificateVerification?: boolean;
  saveResponse?: boolean;
  browseCompatibleHeaders?: boolean;
  sendNoCacheHeader?: boolean;
  requestTimeout?: number | null;
  connectionTimeout?: number | null;
  useSystemProxy?: boolean;
  useCustomProxy?: boolean;
  proxyHost?: string | null;
  proxyPort?: number | null;
  proxyScheme?: HttpScheme | null;
  proxyAuthReq?: boolean | null;
  proxyUsername?: string | null;
  proxyPassword?: string | null;
  keystoreFileContentType?: string | null;
  keystoreFile?: string | null;
  keystoreFileName?: string | null;
  keystorePassphrase?: string | null;
  truststoreFileContentType?: string | null;
  truststoreFile?: string | null;
  truststoreFileName?: string | null;
  truststorePassphrase?: string | null;
  enableNetworkProxy?: boolean;
  enableZapProxy?: boolean;
  apiRequest?: IApiRequest;
}

export class ApiRequestSetting implements IApiRequestSetting {
  constructor(
    public id?: number,
    public showConsole?: boolean,
    public followRedirects?: boolean,
    public redirectAutomatically?: boolean,
    public useKeepAlive?: boolean,
    public encodeUrlAutomatically?: boolean,
    public enableSslCertificateVerification?: boolean,
    public saveResponse?: boolean,
    public browseCompatibleHeaders?: boolean,
    public sendNoCacheHeader?: boolean,
    public requestTimeout?: number | null,
    public connectionTimeout?: number | null,
    public useSystemProxy?: boolean,
    public useCustomProxy?: boolean,
    public proxyHost?: string | null,
    public proxyPort?: number | null,
    public proxyScheme?: HttpScheme | null,
    public proxyAuthReq?: boolean | null,
    public proxyUsername?: string | null,
    public proxyPassword?: string | null,
    public keystoreFileContentType?: string | null,
    public keystoreFile?: string | null,
    public keystoreFileName?: string | null,
    public keystorePassphrase?: string | null,
    public truststoreFileContentType?: string | null,
    public truststoreFile?: string | null,
    public truststoreFileName?: string | null,
    public truststorePassphrase?: string | null,
    public enableNetworkProxy?: boolean,
    public enableZapProxy?: boolean,
    public apiRequest?: IApiRequest
  ) {
    this.showConsole = this.showConsole ?? false;
    this.followRedirects = this.followRedirects ?? false;
    this.redirectAutomatically = this.redirectAutomatically ?? false;
    this.useKeepAlive = this.useKeepAlive ?? false;
    this.encodeUrlAutomatically = this.encodeUrlAutomatically ?? false;
    this.enableSslCertificateVerification = this.enableSslCertificateVerification ?? false;
    this.saveResponse = this.saveResponse ?? false;
    this.browseCompatibleHeaders = this.browseCompatibleHeaders ?? false;
    this.sendNoCacheHeader = this.sendNoCacheHeader ?? false;
    this.useSystemProxy = this.useSystemProxy ?? false;
    this.useCustomProxy = this.useCustomProxy ?? false;
    this.proxyAuthReq = this.proxyAuthReq ?? false;
    this.enableNetworkProxy = this.enableNetworkProxy ?? false;
    this.enableZapProxy = this.enableZapProxy ?? false;
  }
}

export function getApiRequestSettingIdentifier(apiRequestSetting: IApiRequestSetting): number | undefined {
  return apiRequestSetting.id;
}
