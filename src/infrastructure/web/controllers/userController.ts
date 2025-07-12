import express from 'express';
import { UserService } from '../../../application/services/userService';
import { Container } from '../../di/container';
import { User } from '../../../Domain/entities/user/user';
import { UserName } from '../../../Domain/entities/user/UserName';
import { UserEmail } from '../../../Domain/entities/user/userEmail';
import { UserPhone } from '../../../Domain/entities/user/userPhone';
import { UserPassword } from '../../../Domain/entities/user/userPassword';
import { UserBirthDate } from '../../../Domain/entities/user/userBirthDate';
import { UserCreateDate } from '../../../Domain/entities/user/userCreateDate';
import { UserRol } from '../../../Domain/entities/user/userRol';
import { UserId } from '../../../Domain/entities/user/userId';

export const router = express.Router();

// Obtener instancias del contenedor
const container = Container.getInstance();
const userService = container.getUserService();

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
    res.status(201).json({
      id: user._id?.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      phone: user.phone.getValue(),
      birthDate: user.birthDate.getValue(),
      createDate: user.createDate.getValue(),
      role: user.role.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/users', async (_req, res) => {
  try {
    const users = await userService.getAllUser();
    res.json(users.map(user => ({
      id: user._id?.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      phone: user.phone.getValue(),
      birthDate: user.birthDate.getValue(),
      createDate: user.createDate.getValue(),
      role: user.role.getValue()
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      id: user._id?.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      phone: user.phone.getValue(),
      birthDate: user.birthDate.getValue(),
      createDate: user.createDate.getValue(),
      role: user.role.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar usuario
router.put('/users/:id', async (req, res) => {
  try {
    const existingUser = await userService.getUserById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = new User(
      new UserName(req.body.name || existingUser.name.getValue()),
      new UserEmail(req.body.email || existingUser.email.getValue()),
      new UserPhone(req.body.phone || existingUser.phone.getValue()),
      new UserPassword(req.body.password || existingUser.password.getValue()),
      new UserBirthDate(req.body.birthDate || existingUser.birthDate.getValue()),
      existingUser.createDate,
      new UserRol(req.body.role || existingUser.role.getValue()),
      new UserId(req.params.id)
    );

    const result = await userService.updateUser(updatedUser);
    
    res.json({
      id: result._id?.getValue(),
      name: result.name.getValue(),
      email: result.email.getValue(),
      phone: result.phone.getValue(),
      birthDate: result.birthDate.getValue(),
      createDate: result.createDate.getValue(),
      role: result.role.getValue()
    });
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