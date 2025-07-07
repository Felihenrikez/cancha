import express from 'express';
import { UserService } from '../../../application/services/userService';
import { MongooseUserRepository } from '../../database/mongooseUserRepository';

export const router = express.Router();

const userRepository = new MongooseUserRepository();
const userService = new UserService(userRepository);

// Crear usuario
router.post('/users', async (req, res) => {
  try {
    const data = req.body;

    const user = await userService.createUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      birthDate: data.birthDate,
      role: data.role
    });

    // Devuelve el usuario creado con su _id asignado por MongoDB
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/users', async (_req, res) => {
  try {
    const users = await userService.getAllUser();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar usuario
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser({
      ...req.body,
      id: req.params.id,
    });
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar usuario
router.delete('/users/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send(); // No content
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});