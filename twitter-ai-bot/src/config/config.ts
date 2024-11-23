import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    
    // Twitter API Credentials
    TWITTER_API_KEY: process.env.TWITTER_API_KEY,
    TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    
    // AI Configuration
    AI_API_KEY: process.env.AI_API_KEY,
    AI_MODEL: process.env.AI_MODEL || 'gpt-4',
    
    // Rate Limiting
    RATE_LIMIT_POINTS: parseInt(process.env.RATE_LIMIT_POINTS || '50'),
    RATE_LIMIT_DURATION: parseInt(process.env.RATE_LIMIT_DURATION || '3600'),
}; 