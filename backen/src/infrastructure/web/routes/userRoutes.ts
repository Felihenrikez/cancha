import express from 'express';
import { router as userController } from '../controllers/userController';

export function setupUserRoutes(app: express.Application) {
  app.use('/api/users', userController);
}