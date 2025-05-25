import type { ApiKeyScope, GlobalRole } from '@n8n/permissions';
export declare const getApiKeyScopesForRole: (role: GlobalRole) => ApiKeyScope[];
export declare const getOwnerOnlyApiKeyScopes: () => ApiKeyScope[];
