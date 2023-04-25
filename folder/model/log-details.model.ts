export interface ILogDetails {
  id?: number;
  logInfo?: string | null;
}

export class LogDetails implements ILogDetails {
  constructor(public id?: number, public logInfo?: string | null) {}
}

export function getLogDetailsIdentifier(logDetails: ILogDetails): number | undefined {
  return logDetails.id;
}
