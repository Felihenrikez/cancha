import { Router } from 'express';
import { FieldService } from '../../../application/services/fieldService';
import { Container } from '../../di/container';

const router = Router();
const container = Container.getInstance();
const fieldService = container.getFieldService();

router.post('/', async (req, res) => {
  try {
    const field = await fieldService.createField(req.body);
    res.status(201).json({
      id: field._id?.getValue(),
      clubId: field.clubId.getValue(),
      name: field.name.getValue(),
      sportType: field.sportType.getValue(),
      isAvailable: field.isAvailable.getValue(),
      imageUrl: field.imageUrl?.getValue(),
      description: field.description?.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const fields = await fieldService.getAllField();
    res.json(fields.map(field => ({
      id: field._id?.getValue(),
      clubId: field.clubId.getValue(),
      name: field.name.getValue(),
      sportType: field.sportType.getValue(),
      isAvailable: field.isAvailable.getValue(),
      imageUrl: field.imageUrl?.getValue(),
      description: field.description?.getValue()
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const field = await fieldService.getFieldById(req.params.id);
    if (!field) return res.status(404).json({ error: 'Field not found' });
    
    res.json({
      id: field._id?.getValue(),
      clubId: field.clubId.getValue(),
      name: field.name.getValue(),
      sportType: field.sportType.getValue(),
      isAvailable: field.isAvailable.getValue(),
      imageUrl: field.imageUrl?.getValue(),
      description: field.description?.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await fieldService.deleteField(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;