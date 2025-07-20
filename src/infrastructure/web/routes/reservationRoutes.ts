import { Router } from 'express';
import { ReservationService } from '../../../application/services/reservationService';
import { Container } from '../../di/container';

const router = Router();
const container = Container.getInstance();
const reservationService = container.getReservationService();

router.post('/', async (req, res) => {
  try {
    const result = await reservationService.createReservation(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const result = await reservationService.getAllReservation();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    
    res.json({
      id: reservation._id?.getValue(),
      scheduleId: reservation.scheduleId.getValue(),
      userId: reservation.userId.getValue(),
      state: reservation.state.getValue(),
      dateReservation: reservation.dateReservation.getValue(),
      startHour: reservation.startHour.getValue(),
      price: reservation.price.getValue(),
      paymentType: reservation.paymentType?.getValue(),
      membersList: reservation.membersList?.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await reservationService.getReservationsByUserId(req.params.userId);
    res.json(reservations.map(reservation => ({
      id: reservation._id?.getValue(),
      scheduleId: reservation.scheduleId.getValue(),
      userId: reservation.userId.getValue(),
      state: reservation.state.getValue(),
      dateReservation: reservation.dateReservation.getValue(),
      startHour: reservation.startHour.getValue(),
      price: reservation.price.getValue(),
      paymentType: reservation.paymentType?.getValue(),
      membersList: reservation.membersList?.getValue()
    })));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/schedule/:scheduleId', async (req, res) => {
  try {
    const reservations = await reservationService.getReservationsByScheduleId(req.params.scheduleId);
    res.json(reservations.map(reservation => ({
      id: reservation._id?.getValue(),
      scheduleId: reservation.scheduleId.getValue(),
      userId: reservation.userId.getValue(),
      state: reservation.state.getValue(),
      dateReservation: reservation.dateReservation.getValue(),
      startHour: reservation.startHour.getValue(),
      price: reservation.price.getValue(),
      paymentType: reservation.paymentType?.getValue(),
      membersList: reservation.membersList?.getValue()
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
    
    const result = await reservationService.updateReservation(updateRequest);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array of reservations' });
    }

    const result = await reservationService.createBulkReservations(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;