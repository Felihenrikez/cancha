import { Router } from 'express';
import { AuthService } from '../../../application/services/authService';
import { Container } from '../../di/container';

const router = Router();
const container = Container.getInstance();
const authService = container.getAuthService();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await authService.login({ email, password });
    
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;