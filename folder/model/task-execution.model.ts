import dayjs from 'dayjs/esm';
import { ITestCase } from 'app/entities/UiTestController/test-case/test-case.model';
import { ITestData } from 'app/entities/TestOpsCtrl/api-test/model/test-data.model';
import { IStep } from 'app/entities/TestOpsCtrl/api-test/model/step.model';
import { ITestRun } from 'app/entities/UiTestController/test-run/test-run.model';
import { ITestPipeline } from 'app/entities/TestOpsCtrl/api-test/model/test-pipeline.model';
import { ITestPlan } from 'app/entities/TestOpsCtrl/api-test/model/test-plan.model';
import { ITestPack } from 'app/entities/UiTestController/test-pack/test-pack.model';
import { IApiRequest } from 'app/entities/TestOpsCtrl/api-request/model/api-request.model';
import { IMobileRequest } from 'app/entities/TestOpsCtrl/mobile-request/mobile-request.model';
import { IWebRequest } from 'app/entities/TestOpsCtrl/web-request/web-request.model';
import { EntityType } from 'app/entities/enumerations/entity-type.model';
import { TaskType } from 'app/entities/enumerations/task-type.model';
import { ExecutionMode } from 'app/entities/enumerations/execution-mode.model';
import { TestStatus } from 'app/entities/enumerations/test-status.model';
import { State } from 'app/entities/enumerations/state.model';
import { ITestResult } from '../../api-test/model/test-result.model';

export interface ITaskExecution {
  id?: number;
  name?: string | null;
  parallelExecution?: boolean;
  entityType?: EntityType | null;
  type?: TaskType | null;
  executionMode?: ExecutionMode | null;
  status?: TestStatus | null;
  leaf?: boolean;
  state?: State;
  progress?: number | null;
  priority?: number | null;
  retryCount?: number | null;
  taskNumber?: number | null;
  nextTaskNumber?: number | null;
  totalTasks?: number | null;
  executedTasks?: number | null;
  failedTasks?: number | null;
  createTime?: dayjs.Dayjs | null;
  startTime?: dayjs.Dayjs | null;
  endTime?: dayjs.Dayjs | null;
  childTasks?: ITaskExecution[] | null;
  testCase?: ITestCase | null;
  testData?: ITestData | null;
  step?: IStep | null;
  testRun?: ITestRun | null;
  testPipeline?: ITestPipeline | null;
  testPlan?: ITestPlan | null;
  testPack?: ITestPack | null;
  parentTask?: ITaskExecution | null;
  apiRequest?: IApiRequest | null;
  mobileRequest?: IMobileRequest | null;
  webRequest?: IWebRequest | null;
  testResults?: ITestResult[] | [];
}

export class TaskExecution implements ITaskExecution {
  constructor(
    public id?: number,
    public name?: string | null,
    public parallelExecution?: boolean,
    public entityType?: EntityType | null,
    public type?: TaskType | null,
    public executionMode?: ExecutionMode | null,
    public status?: TestStatus | null,
    public leaf?: boolean,
    public state?: State,
    public progress?: number | null,
    public priority?: number | null,
    public retryCount?: number | null,
    public taskNumber?: number | null,
    public nextTaskNumber?: number | null,
    public totalTasks?: number | null,
    public executedTasks?: number | null,
    public failedTasks?: number | null,
    public createTime?: dayjs.Dayjs | null,
    public startTime?: dayjs.Dayjs | null,
    public endTime?: dayjs.Dayjs | null,
    public childTasks?: ITaskExecution[] | null,
    public testCase?: ITestCase | null,
    public testData?: ITestData | null,
    public step?: IStep | null,
    public testRun?: ITestRun | null,
    public testPipeline?: ITestPipeline | null,
    public testPlan?: ITestPlan | null,
    public testPack?: ITestPack | null,
    public parentTask?: ITaskExecution | null,
    public apiRequest?: IApiRequest | null,
    public mobileRequest?: IMobileRequest | null,
    public webRequest?: IWebRequest | null,
    public testResults?: ITestResult[] | []
  ) {
    this.parallelExecution = this.parallelExecution ?? false;
    this.leaf = this.leaf ?? false;
  }
}

export function getTaskExecutionIdentifier(taskExecution: ITaskExecution): number | undefined {
  return taskExecution.id;
}
