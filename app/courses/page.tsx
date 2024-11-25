"use client";
import { getCourseCodes, getCourseInfo } from "@/api/api";
import { CourseInfo } from "@/api/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Courses() {
  const searchParams = useSearchParams();
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [courseCodes, setCourseCodes] = useState<string[] | null>(null);

  useEffect(() => {
    setCourseCode(searchParams.get("code"));
    getCourseCodes()
      .then((codes) => setCourseCodes(codes.sort()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!courseCode) return;
    getCourseInfo(courseCode).then(setCourseInfo).catch(console.error);
  }, [courseCode]);

  return (
    <section className="flex flex-col m-2 gap-2 p-2">
      {courseCodes && (
        <Select onValueChange={setCourseCode} value={courseCode || undefined}>
          <SelectTrigger className="w-[180px] p-2">
            <SelectValue placeholder="Select Course Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course Code</SelectLabel>
              {courseCodes.map((code, idx) => (
                <SelectItem key={idx} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {/* Course Information */}
      {courseInfo && (
        <Card>
          <CardHeader>
            <CardTitle>{courseInfo.code}</CardTitle>
            <CardDescription>{courseInfo.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-600 mt-4">
              Faculties:
            </h3>
            <ul className="list-disc list-inside mt-2 space-y-2">
              {courseInfo.courseFaculties.map(({ code, name }, idx) => (
                <li key={idx} className="text-gray-700">
                  <span className="font-semibold">{name} </span>
                  <Link
                    href={`/froutine?code=${code}`}
                    className="text-gray-600"
                  >
                    ({code})
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
