import { WebhookEntity } from '@n8n/db';
import { DataSource, Repository } from '@n8n/typeorm';
export declare class WebhookRepository extends Repository<WebhookEntity> {
    constructor(dataSource: DataSource);
}
