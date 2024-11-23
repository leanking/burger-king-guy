import { APIManager } from './APIManager';
import { RateControlManager } from './RateControlManager';
import { logger } from '../utils/logger';

export class QueueHandler {
    private queue: any[] = [];
    private isProcessing: boolean = false;

    constructor(
        private apiManager: APIManager,
        private rateController: RateControlManager
    ) {}

    async initialize() {
        this.startProcessing();
        logger.info('Queue handler initialized');
    }

    async addToQueue(task: any) {
        this.queue.push(task);
        logger.info(`Task added to queue. Queue length: ${this.queue.length}`);
    }

    private async startProcessing() {
        if (this.isProcessing) return;

        this.isProcessing = true;
        while (this.queue.length > 0) {
            const canProceed = await this.rateController.checkRateLimit();
            if (!canProceed) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                continue;
            }

            const task = this.queue.shift();
            try {
                await this.processTask(task);
            } catch (error) {
                logger.error('Error processing task:', error);
            }
        }
        this.isProcessing = false;
    }

    private async processTask(task: any) {
        // Implementation depends on task type
        logger.info('Processing task:', task);
    }
} 