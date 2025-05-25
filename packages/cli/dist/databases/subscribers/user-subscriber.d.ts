import { User } from '@n8n/db';
import type { EntitySubscriberInterface, UpdateEvent } from '@n8n/typeorm';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    private readonly eventReporter;
    listenTo(): typeof User;
    afterUpdate(event: UpdateEvent<User>): Promise<void>;
}
