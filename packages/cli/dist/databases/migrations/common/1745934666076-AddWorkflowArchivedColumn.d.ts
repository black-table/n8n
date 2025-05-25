import type { MigrationContext, ReversibleMigration } from '../../../databases/types';
export declare class AddWorkflowArchivedColumn1745934666076 implements ReversibleMigration {
    up({ escape, runQuery }: MigrationContext): Promise<void>;
    down({ escape, runQuery }: MigrationContext): Promise<void>;
}
