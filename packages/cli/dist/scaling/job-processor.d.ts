import type { RunningJobSummary } from '@n8n/api-types';
import { ExecutionRepository } from '@n8n/db';
import { InstanceSettings, ErrorReporter, Logger } from 'n8n-core';
import { WorkflowRepository } from '../databases/repositories/workflow.repository';
import { ManualExecutionService } from '../manual-execution.service';
import { NodeTypes } from '../node-types';
import type { Job, JobId, JobResult } from './scaling.types';
export declare class JobProcessor {
    private readonly logger;
    private readonly errorReporter;
    private readonly executionRepository;
    private readonly workflowRepository;
    private readonly nodeTypes;
    private readonly instanceSettings;
    private readonly manualExecutionService;
    private readonly runningJobs;
    constructor(logger: Logger, errorReporter: ErrorReporter, executionRepository: ExecutionRepository, workflowRepository: WorkflowRepository, nodeTypes: NodeTypes, instanceSettings: InstanceSettings, manualExecutionService: ManualExecutionService);
    processJob(job: Job): Promise<JobResult>;
    stopJob(jobId: JobId): void;
    getRunningJobIds(): JobId[];
    getRunningJobsSummary(): RunningJobSummary[];
    private encodeWebhookResponse;
}
