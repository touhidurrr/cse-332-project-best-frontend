export interface Course {
  code: string;
  name: string;
}

export interface Faculty {
  code: string;
  name: string;
}

export interface CourseFaculty {
  faculty: Faculty;
  count: number;
}

export interface CourseInfo {
  course: Course;
  courseFaculties: CourseFaculty[];
}

export interface Class {
  course: Course;
  faculty: Faculty;
  building: string;
  room: string;
}

export interface FacultyClass {
  course: Course;

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
  faculty: Faculty;
  classes: FacultyClass[];
}

export interface Routine {
  program: string;
  intake: number;
  section: string;
  semester: string;
  periods: string[];
  classes: (Class | null)[][];
}

export interface RoutineClass {
  dIdx: number; // day index, [0 = Saturday, 1 = Sunday, ...]
  pIdx: number; // period index
  cls: Class;
}

export type BuildingRoomsMap = {
  [building: string]: string[];
};
