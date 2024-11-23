import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export class APIManager {
    private twitterClient: TwitterApi;

    constructor() {
        this.twitterClient = new TwitterApi({
            appKey: config.TWITTER_API_KEY,
            appSecret: config.TWITTER_API_SECRET,
            accessToken: config.TWITTER_ACCESS_TOKEN,
            accessSecret: config.TWITTER_ACCESS_TOKEN_SECRET,
        });
    }

    async postTweet(content: string): Promise<string> {
        try {
            const tweet = await this.twitterClient.v2.tweet(content);
            logger.info(`Tweet posted successfully: ${tweet.data.id}`);
            return tweet.data.id;
        } catch (error) {
            logger.error('Error posting tweet:', error);
            throw error;
        }
    }

    async getTweet(id: string) {
        try {
            return await this.twitterClient.v2.singleTweet(id);
        } catch (error) {
            logger.error('Error fetching tweet:', error);
            throw error;
        }
    }
} 