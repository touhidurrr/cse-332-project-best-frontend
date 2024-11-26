export interface Class {
  courseCode: string;
  facultyCode: string;
  building: string;
  room: string;
}

export interface Routine {
  program: string;
  intake: number;
  section: string;
  semester: string;
  periods: string[];
  classes: (Class | null)[][];
}

export interface FacultyClass {
  courseCode: string;
  building: string;
  room: string;

  dayIdx: number;
  periodIdx: number;
  period: string;

  program: string;
  intake: number;
  section: string;
}

export interface FacultyInfo {
  code: string;
  name: string;
  classes: FacultyClass[];
}
export interface CourseInfo {
  code: string;
  name: string;
  courseFaculties: {
    code: string;
    name: string;
  }[];
}

export interface RoutineClass {
  dIdx: number; // day index, [0 = Saturday, 1 = Sunday, ...]
  pIdx: number; // period index
  cls: Class;
}

export type BuildingRoomsMap = {
  [building: string]: string[];
};
