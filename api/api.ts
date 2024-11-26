"use client";
import { Axios } from "axios";
import {
  BuildingRoomsMap,
  CourseInfo,
  FacultyInfo,
  Routine,
  RoutineClass,
} from "./types";

let hostname = "localhost";
if (typeof window !== "undefined") {
  hostname = window.location.hostname;
} else if (typeof process !== "undefined") {
  if (typeof process.env?.BACKEND_URL === "string") {
    hostname = process.env.BACKEND_URL;
  }
}

// cse332-backend.touhidur.pro
const api = new Axios({
  baseURL: hostname.endsWith("touhidur.pro")
    ? "https://cse332-backend.touhidur.pro"
    : hostname.endsWith("xn--45be4a8a4an7e.xn--54b7fta0cc")
      ? "https://xn--w5b8awcb.xn--45be4a8a4an7e.xn--54b7fta0cc"
      : "http://localhost:8080",
});

function ifStringThenObject<T>(data: string | T): T {
  return typeof data === "string" ? JSON.parse(data) : data;
}

export const getRoutines = async (): Promise<Routine[]> =>
  api.get("/routines").then((res) => ifStringThenObject(res.data));

export const getFacultyName = async (facultyCode: string): Promise<string> =>
  api.get(`/facultyName/${facultyCode}`).then((res) => res.data);
export const getFacultyCodes = async (): Promise<string[]> =>
  api.get("/facultyCodes").then((res) => ifStringThenObject(res.data));
export const getFacultyInfo = async (
  facultyCode: string,
): Promise<FacultyInfo> =>
  api
    .get(`/faculty/${facultyCode}`)
    .then((res) => ifStringThenObject(res.data));

export const getCourseCodes = async (): Promise<string[]> =>
  api.get("/courseCodes").then((res) => ifStringThenObject(res.data));
export const getCourseInfo = async (courseCode: string): Promise<CourseInfo> =>
  api.get(`/courses/${courseCode}`).then((res) => ifStringThenObject(res.data));

export const getBuildings = async (): Promise<string[]> =>
  api.get("/buildings").then((res) => ifStringThenObject(res.data));
export const getRooms = async (building: string): Promise<string[]> =>
  api.get(`/buildings/${building}`).then((res) => ifStringThenObject(res.data));
export const getBuildingRoomsMap = async (): Promise<BuildingRoomsMap> =>
  api.get("/buildingRoomsMap").then((res) => ifStringThenObject(res.data));

export const getClasses = (
  building?: string | null,
  room?: string | null,
): Promise<RoutineClass[]> =>
  api
    .get("/routineClasses", { params: { building, room } })
    .then((res) => ifStringThenObject(res.data));
