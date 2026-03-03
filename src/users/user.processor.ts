import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { USER_QUEUE } from './user.constants';

@Processor(USER_QUEUE.name)
export class UserProcessor extends WorkerHost {
    private readonly logger = new Logger(UserProcessor.name);

    async process(job: Job): Promise<any> {
        switch (job.name) {
            case USER_QUEUE.jobs.SEND_WELCOME_EMAIL:
                return this.handleWelcomeEmail(job);
            default:
                this.logger.warn(`Unknown job: ${job.name}`);
        }
    }

    private async handleWelcomeEmail(job: Job) {
        const { email, name } = job.data;

        this.logger.log(`Sending welcome email to ${email}...`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        this.logger.log(`Email sent to ${email}`);
        return { 
            success: true,
            sentTo: email,
        };
    }
}
