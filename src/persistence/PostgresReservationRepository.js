export class PostgresReservationRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async create(reservation) {
    const result = await this.pool.query(
      `INSERT INTO reservations (id, customer_name, resource_name, starts_at, ends_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, customer_name, resource_name, starts_at, ends_at, created_at`,
      [
        reservation.id,
        reservation.customerName,
        reservation.resourceName,
        reservation.startsAt,
        reservation.endsAt,
      ],
    );

    return this.toReservation(result.rows[0]);
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT id, customer_name, resource_name, starts_at, ends_at, created_at
       FROM reservations
       ORDER BY starts_at ASC, id ASC`,
    );

    return result.rows.map((row) => this.toReservation(row));
  }

  toReservation(row) {
    return {
      id: row.id,
      customerName: row.customer_name,
      resourceName: row.resource_name,
      startsAt: row.starts_at,
      endsAt: row.ends_at,
      createdAt: row.created_at,
    };
  }
}
