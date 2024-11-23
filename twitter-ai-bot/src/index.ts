import express from 'express';
import { APIManager } from './core/APIManager';
import { QueueHandler } from './core/QueueHandler';
import { RateControlManager } from './core/RateControlManager';
import { logger } from './utils/logger';
import { config } from './config/config';

const app = express();
const port = config.PORT || 3000;

async function bootstrap() {
    try {
        const apiManager = new APIManager();
        const rateController = new RateControlManager();
        const queueHandler = new QueueHandler(apiManager, rateController);

        await queueHandler.initialize();

        app.listen(port, () => {
            logger.info(`Server running on port ${port}`);
        });
    } catch (error) {
        logger.error('Failed to bootstrap application:', error);
        process.exit(1);
    }
}

bootstrap(); 