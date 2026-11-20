import { randomUUID } from 'node:crypto';

export class InvalidReservationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidReservationError';
  }
}

export class CreateReservationService {
  constructor(reservations) {
    this.reservations = reservations;
  }

  async execute(input) {
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
      throw new InvalidReservationError('El cuerpo debe ser un objeto JSON.');
    }

    const allowedFields = new Set(['customerName', 'resourceName', 'startsAt', 'endsAt']);
    const unexpectedField = Object.keys(input).find((field) => !allowedFields.has(field));
    if (unexpectedField) {
      throw new InvalidReservationError(`El campo ${unexpectedField} no está permitido.`);
    }

    const customerName = this.requiredText(input.customerName, 'customerName');
    const resourceName = this.requiredText(input.resourceName, 'resourceName');
    const startsAt = this.validDate(input.startsAt, 'startsAt');
    const endsAt = this.validDate(input.endsAt, 'endsAt');

    if (startsAt >= endsAt) {
      throw new InvalidReservationError('endsAt debe ser posterior a startsAt.');
    }

    return this.reservations.create({
      id: randomUUID(),
      customerName,
      resourceName,
      startsAt,
      endsAt,
      createdAt: new Date(),
    });
  }

  requiredText(value, field) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new InvalidReservationError(`${field} es obligatorio y debe ser texto.`);
    }
    const normalized = value.trim();
    if (normalized.length > 160) {
      throw new InvalidReservationError(`${field} no puede superar 160 caracteres.`);
    }
    return normalized;
  }

  validDate(value, field) {
    const isoDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
    if (typeof value !== 'string' || !isoDateTime.test(value)) {
      throw new InvalidReservationError(`${field} debe ser una fecha ISO válida.`);
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new InvalidReservationError(`${field} debe ser una fecha ISO válida.`);
    }
    return parsed;
  }
}


