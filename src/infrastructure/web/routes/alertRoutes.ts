import { Router } from 'express';
import { AlertService } from '../../../application/services/alertService';
import { Container } from '../../di/container';

const router = Router();
const container = Container.getInstance();
const alertService = container.getAlertService();

router.post('/', async (req, res) => {
  try {
    const result = await alertService.createAlert(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const result = await alertService.getAllAlert();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const alert = await alertService.getAlertById(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    
    res.json({
      id: alert._id?.getValue(),
      senderId: alert.senderId.getValue(),
      recipientId: alert.recipientId.getValue(),
      message: alert.message.getValue(),
      createdAt: alert.createdAt.getValue().toISOString(),
      status: alert.status.getValue(),
      type: alert.type.getValue(),
      eventId: alert.eventId
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/sender/:senderId', async (req, res) => {
  try {
    const alerts = await alertService.getAlertsBySenderId(req.params.senderId);
    res.json(alerts.map(alert => ({
      id: alert._id?.getValue(),
      senderId: alert.senderId.getValue(),
      recipientId: alert.recipientId.getValue(),
      message: alert.message.getValue(),
      createdAt: alert.createdAt.getValue().toISOString(),
      status: alert.status.getValue(),
      type: alert.type.getValue(),
      eventId: alert.eventId
    })));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/recipient/:recipientId', async (req, res) => {
  try {
    const alerts = await alertService.getAlertsByRecipientId(req.params.recipientId);
    res.json(alerts.map(alert => ({
      id: alert._id?.getValue(),
      senderId: alert.senderId.getValue(),
      recipientId: alert.recipientId.getValue(),
      message: alert.message.getValue(),
      createdAt: alert.createdAt.getValue().toISOString(),
      status: alert.status.getValue(),
      type: alert.type.getValue(),
      eventId: alert.eventId
    })));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateRequest = {
      id: req.params.id,
      ...req.body
    };
    
    const result = await alertService.updateAlert(updateRequest);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array of alerts' });
    }

    const result = await alertService.createBulkAlerts(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/notify-members', async (req, res) => {
  try {
    const { reservationId, members, senderId, eventType } = req.body;
    
    if (!reservationId || !members || !Array.isArray(members) || !senderId || !eventType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await alertService.notifyReservationMembers({
      reservationId,
      members,
      senderId,
      eventType
    });
    
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await alertService.deleteAlert(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;