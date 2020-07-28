type DirectionNumber = -1 | 0 | 1;
export default class Direction {
  static North = new Direction(0, -1);

  static Northwest = new Direction(-1, -1);

  static Northeast = new Direction(1, -1);

  static West = new Direction(-1, 0);

  static East = new Direction(1, 0);

  static South = new Direction(0, 1);

  static Southwest = new Direction(-1, 1);

  static Southeast = new Direction(1, 1);

  static Directions = [
    Direction.Northwest,
    Direction.North,
    Direction.Northeast,
    Direction.East,
    Direction.Southeast,
    Direction.South,
    Direction.Southwest,
    Direction.West,
  ];

  constructor(
    public readonly x: DirectionNumber,
    public readonly y: DirectionNumber,
  ) {}
}
