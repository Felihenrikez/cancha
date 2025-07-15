import { Router } from 'express';
import { ScheduleService } from '../../../application/services/scheduleService';
import { Container } from '../../di/container';
import { Schedule } from '../../../Domain/entities/schedule/schedule';
import { ScheduleId } from '../../../Domain/entities/schedule/scheduleId';
import { SchedulePrice } from '../../../Domain/entities/schedule/schedulePrice';
import { ScheduleDate } from '../../../Domain/entities/schedule/scheduleDate';
import { ScheduleStartHour } from '../../../Domain/entities/schedule/scheduleStartHour';
import { ScheduleIsAvailable } from '../../../Domain/entities/schedule/scheduleIsAvailable';

const router = Router();
const container = Container.getInstance();
const scheduleService = container.getScheduleService();

router.post('/', async (req, res) => {
  try {
    const schedule = await scheduleService.createSchedule(req.body);
    res.status(201).json({
      id: schedule._id?.getValue(),
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array of schedules' });
    }

    const schedules = await scheduleService.createBulkSchedules(req.body);
    res.status(201).json({
      message: `${schedules.length} schedules created successfully`,
      schedules: schedules.map(schedule => ({
        id: schedule._id?.getValue(),
        fieldId: schedule.fieldId.getValue(),
        clubId: schedule.clubId.getValue(),
        fieldName: schedule.fieldName.getValue(),
        clubName: schedule.clubName.getValue(),
        price: schedule.price.getValue(),
        date: schedule.date.getValue(),
        startHour: schedule.startHour.getValue(),
        isAvailable: schedule.isAvailable.getValue()
      }))
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedule();
    res.json(schedules.map(schedule => ({
      id: schedule._id?.getValue(),
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    
    res.json({
      id: schedule._id?.getValue(),
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/field/:fieldId', async (req, res) => {
  try {
    const schedules = await scheduleService.getSchedulesByFieldId(req.params.fieldId);
    res.json(schedules.map(schedule => ({
      id: schedule._id?.getValue(),
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    })));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/club/:clubId', async (req, res) => {
  try {
    const schedules = await scheduleService.getSchedulesByClubId(req.params.clubId);
    res.json(schedules.map(schedule => ({
      id: schedule._id?.getValue(),
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    })));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const existingSchedule = await scheduleService.getScheduleById(req.params.id);
    if (!existingSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const updatedSchedule = new Schedule(
      existingSchedule.fieldId,
      existingSchedule.clubId,
      existingSchedule.fieldName,
      existingSchedule.clubName,
      new SchedulePrice(req.body.price || existingSchedule.price.getValue()),
      new ScheduleDate(req.body.date || existingSchedule.date.getValue()),
      new ScheduleStartHour(req.body.startHour || existingSchedule.startHour.getValue()),
      new ScheduleIsAvailable(req.body.isAvailable !== undefined ? req.body.isAvailable : existingSchedule.isAvailable.getValue()),
      new ScheduleId(req.params.id)
    );

    const result = await scheduleService.updateSchedule(updatedSchedule);
    
    res.json({
      id: result._id?.getValue(),
      fieldId: result.fieldId.getValue(),
      clubId: result.clubId.getValue(),
      fieldName: result.fieldName.getValue(),
      clubName: result.clubName.getValue(),
      price: result.price.getValue(),
      date: result.date.getValue(),
      startHour: result.startHour.getValue(),
      isAvailable: result.isAvailable.getValue()
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await scheduleService.deleteSchedule(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;