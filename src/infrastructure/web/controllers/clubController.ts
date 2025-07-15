import { Router } from 'express';
import { ClubService } from '../../../application/services/clubService';
import { Container } from '../../di/container';

const router = Router();
const container = Container.getInstance();
const clubService = container.getClubService();

router.post('/', async (req, res) => {
  try {
    const club = await clubService.createClub(req.body);
    res.status(201).json({
      id: club._id?.getValue(),
      userId: club.userId.getValue(),
      name: club.name.getValue(),
      address: club.address.getValue(),
      phone: club.phone.getValue(),
      fieldId: club.fieldId?.map(id => id.getValue()),
      description: club.description?.getValue(),
      imageUrl: club.imageUrl?.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const clubs = await clubService.getAllClub();
    res.json(clubs.map(club => ({
      id: club._id?.getValue(),
      userId: club.userId.getValue(),
      name: club.name.getValue(),
      address: club.address.getValue(),
      phone: club.phone.getValue(),
      fieldId: club.fieldId?.map(id => id.getValue()),
      description: club.description?.getValue(),
      imageUrl: club.imageUrl?.getValue()
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const club = await clubService.getClubById(req.params.id);
    if (!club) return res.status(404).json({ error: 'Club not found' });
    
    res.json({
      id: club._id?.getValue(),
      userId: club.userId.getValue(),
      name: club.name.getValue(),
      address: club.address.getValue(),
      phone: club.phone.getValue(),
      fieldId: club.fieldId?.map(id => id.getValue()),
      description: club.description?.getValue(),
      imageUrl: club.imageUrl?.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await clubService.deleteClub(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;