"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddScopesColumnToApiKeys1742918400000 = void 0;
const db_1 = require("@n8n/db");
const permissions_ee_1 = require("../../../public-api/permissions.ee");
class AddScopesColumnToApiKeys1742918400000 {
    async up({ runQuery, escape, queryRunner, schemaBuilder: { addColumns, column }, }) {
        await addColumns('user_api_keys', [column('scopes').json]);
        const userApiKeysTable = escape.tableName('user_api_keys');
        const userTable = escape.tableName('user');
        const idColumn = escape.columnName('id');
        const userIdColumn = escape.columnName('userId');
        const roleColumn = escape.columnName('role');
        const apiKeysWithRoles = await runQuery(`SELECT ${userApiKeysTable}.${idColumn} AS id, ${userTable}.${roleColumn} AS role FROM ${userApiKeysTable} JOIN ${userTable} ON ${userTable}.${idColumn} = ${userApiKeysTable}.${userIdColumn}`);
        for (const { id, role } of apiKeysWithRoles) {
            const scopes = (0, permissions_ee_1.getApiKeyScopesForRole)(role);
            await queryRunner.manager.update(db_1.ApiKey, { id }, { scopes });
        }
    }
    async down({ schemaBuilder: { dropColumns } }) {
        await dropColumns('user_api_keys', ['scopes']);
    }
}
exports.AddScopesColumnToApiKeys1742918400000 = AddScopesColumnToApiKeys1742918400000;
//# sourceMappingURL=1742918400000-AddScopesColumnToApiKeys.js.map