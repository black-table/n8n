import type { IrreversibleMigration, MigrationContext } from '../../../databases/types';
export declare class PurgeInvalidWorkflowConnections1675940580449 implements IrreversibleMigration {
    up({ queryRunner }: MigrationContext): Promise<void>;
}
