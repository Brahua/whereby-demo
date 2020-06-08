export interface IRespuesta<T> {
  tipo?: number;
  mensaje?: string;
  dato: T;
}
