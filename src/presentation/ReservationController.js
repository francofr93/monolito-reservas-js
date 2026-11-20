import { InvalidReservationError } from '../application/CreateReservationService.js';

export class ReservationController {
  constructor(createReservation, listReservations) {
    this.createReservation = createReservation;
    this.listReservations = listReservations;
  }

  create = async (request, response, next) => {
    try {
      const reservation = await this.createReservation.execute(request.body ?? {});
      response.status(201).json({ data: reservation });
    } catch (error) {
      if (error instanceof InvalidReservationError) {
        response.status(400).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  list = async (_request, response, next) => {
    try {
      const reservations = await this.listReservations.execute();
      response.status(200).json({ data: reservations });
    } catch (error) {
      next(error);
    }
  };
}
