import { IFieldValidator } from 'app/entities/TestOpsCtrl/api-request/model/field-validator.model';
import { OperationType } from 'app/entities/enumerations/operation-type.model';

export interface IOperations {
  id?: number;
  name?: OperationType | null;
  fieldValidator?: IFieldValidator;
}

export class Operations implements IOperations {
  constructor(public id?: number, public name?: OperationType | null, public fieldValidator?: IFieldValidator) {}
}

export function getOperationsIdentifier(operations: IOperations): number | undefined {
  return operations.id;
}
