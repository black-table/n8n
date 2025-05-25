"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnerOnlyApiKeyScopes = exports.getApiKeyScopesForRole = void 0;
const global_roles_scopes_1 = require("./global-roles-scopes");
const MAP_ROLE_SCOPES = {
    'global:owner': global_roles_scopes_1.OWNER_API_KEY_SCOPES,
    'global:admin': global_roles_scopes_1.ADMIN_API_KEY_SCOPES,
    'global:member': global_roles_scopes_1.MEMBER_API_KEY_SCOPES,
};
const getApiKeyScopesForRole = (role) => {
    return MAP_ROLE_SCOPES[role];
};
exports.getApiKeyScopesForRole = getApiKeyScopesForRole;
const getOwnerOnlyApiKeyScopes = () => {
    const ownerScopes = new Set(MAP_ROLE_SCOPES['global:owner']);
    const memberScopes = new Set(MAP_ROLE_SCOPES['global:member']);
    memberScopes.forEach((item) => ownerScopes.delete(item));
    return Array.from(ownerScopes);
};
exports.getOwnerOnlyApiKeyScopes = getOwnerOnlyApiKeyScopes;
//# sourceMappingURL=index.js.map