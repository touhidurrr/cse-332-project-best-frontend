"use client";
import { getCourseCodes, getCourseInfo } from "@/api/api";
import { CourseInfo } from "@/api/types";
import LinkedHoverCard from "@/components/linked-hover-card";
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
            <CardTitle>{courseInfo.course.code}</CardTitle>
            <CardDescription>{courseInfo.course.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-600 mt-4">
              Faculties:
            </h3>
            <ul className="list-disc list-inside mt-2 space-y-2">
              {courseInfo.courseFaculties
                .sort((a, b) => b.count - a.count)
                .map(({ faculty, count }, idx) => (
                  <li key={idx} className="text-gray-700">
                    <LinkedHoverCard
                      link={`/froutine?code=${faculty.code}`}
                      title={faculty.code}
                      description={faculty.name}
                    >
                      <span className="font-semibold">{faculty.name} </span>
                    </LinkedHoverCard>
                    (Classes: {count})
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
