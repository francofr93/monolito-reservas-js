export class ListReservationsService {
  constructor(reservations) {
    this.reservations = reservations;
  }

  execute() {
    return this.reservations.findAll();
  }
}
