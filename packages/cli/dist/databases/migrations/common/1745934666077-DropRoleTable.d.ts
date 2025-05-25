import type { IrreversibleMigration, MigrationContext } from '../../../databases/types';
export declare class DropRoleTable1745934666077 implements IrreversibleMigration {
    up({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
