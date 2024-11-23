import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'redis';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export class RateControlManager {
    private rateLimiter: RateLimiterRedis;
    private redisClient: Redis.RedisClientType;

    constructor() {
        this.initializeRedis();
    }

    private async initializeRedis() {
        this.redisClient = Redis.createClient({
            url: config.REDIS_URL
        });

        await this.redisClient.connect();

        this.rateLimiter = new RateLimiterRedis({
            storeClient: this.redisClient,
            keyPrefix: 'twitter_limiter',
            points: 50,  // Number of requests
            duration: 3600  // Per hour
        });
    }

    async checkRateLimit(): Promise<boolean> {
        try {
            await this.rateLimiter.consume('twitter_api');
            return true;
        } catch (error) {
            logger.warn('Rate limit exceeded');
            return false;
        }
    }
} 