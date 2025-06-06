import rateLimit from 'express-rate-limit';

export const loginLimit = rateLimit({
windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, try again later.'
})