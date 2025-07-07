import { Request, Response } from 'express';
import { FieldId } from '../../../Domain/entities/field/fieldId';
import { FieldMongoRepository } from '../repositories/fieldMongoRepository';
import { Field } from '../../../Domain/entities/field/field';

export class FieldController {
    private static repo = new FieldMongoRepository();

    // Crear una nueva cancha (POST /fields)
    static async create(req: Request, res: Response) {
        try {
            const fieldData: Field = req.body;
            const createdField = await this.repo.create(fieldData);
            res.status(201).json(createdField);
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    }

    // Obtener una cancha por ID (GET /fields/:id)
    static async getById(req: Request, res: Response) {
        try {
            const fieldId = new FieldId(req.params.id);
            const field = await this.repo.findById(fieldId);
            if (!field) return res.status(404).json({ error: 'Cancha no encontrada' });
            res.status(200).json(field);
        } catch (error) {
            res.status(400).json({ error, res });
        }
    }

    // Obtener todas las canchas de un club (GET /fields/club/:clubId)
    static async getByClubId(req: Request, res: Response) {
        try {
            const clubId = req.params.clubId;
            const fields = await this.repo.findByClubId(clubId);
            res.status(200).json(fields);
        } catch (error) {
            res.status(400).json({ error: 'Cancha no encontrada' });
        }
    }

    // Actualizar una cancha (PUT /fields/:id)
    static async update(req: Request, res: Response) {
        try {
            const fieldId = new FieldId(req.params.id);
            const fieldData: Field = { ...req.body, id: fieldId.value }; // Asegurar que el ID coincida
            const updatedField = await this.repo.update(fieldData);
            res.status(200).json(updatedField);
        } catch (error) {
            res.status(400).json({ error: 'Cancha no editada' });
        }
    }

    // Eliminar una cancha (DELETE /fields/:id)
    static async delete(req: Request, res: Response) {
        try {
            const fieldId = new FieldId(req.params.id);
            await this.repo.delete(fieldId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: 'Cancha no eliminada' });
        }
    }
}