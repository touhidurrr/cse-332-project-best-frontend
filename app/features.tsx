import {
  BookText,
  Calendar,
  Home,
  LucideRefreshCcw,
  PackageSearch,
} from "lucide-react";

export const features = [
  {
    title: "Home",
    description: "The landing page of the application.",
    url: "/",
    icon: Home,
  },
  {
    title: "Student Routines",
    description: "View your class routines.",
    url: "/routines",
    icon: Calendar,
  },
  {
    title: "Faculty Routine",
    description: "Take a peek into a faculty's class routine.",
    url: "/froutine",
    icon: Calendar,
  },
  {
    title: "Course Info",
    description: "Learn more about a course.",
    url: "/courses",
    icon: BookText,
  },
  {
    title: "Retake Section Finder",
    description: "Find the section to retake a course.",
    url: "/retake",
    icon: LucideRefreshCcw,
  },
  {
    title: "Room Finder",
    description: "Find an empty room for a class.",
    url: "/room-finder",
    icon: PackageSearch,
  },
];
