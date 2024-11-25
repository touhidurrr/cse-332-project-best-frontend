"use client";
import { getFacultyCodes, getFacultyInfo, getRoutines } from "@/api/api";
import { FacultyInfo, Routine } from "@/api/types";
import StudentRoutine from "@/components/studentRoutine";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import FacultyRoutine from "@/components/facultyRoutine";

export default function Routines() {
  const searchParams = useSearchParams();
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyCode, setFacultyCode] = useState<string | null>(
    searchParams.get("facultyCode"),
  );
  const [facultyCodes, setFacultyCodes] = useState<string[] | null>(null);

  useEffect(() => {
    getFacultyCodes().then(setFacultyCodes).catch(console.error);
  }, []);

  useEffect(() => {
    facultyCode &&
      getFacultyInfo(facultyCode).then(setFacultyInfo).catch(console.error);
  }, [facultyCode]);

  return (
    <section className="min-h-full min-w-full flex flex-col m-2">
      {facultyCodes && (
        <Select onValueChange={setFacultyCode}>
          <SelectTrigger className="w-[180px] p-2">
            <SelectValue placeholder="Select Faculty Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Faculty Code</SelectLabel>
              {facultyCodes.map((code, idx) => (
                <SelectItem key={idx} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {facultyInfo && <FacultyRoutine facultyInfo={facultyInfo} />}
    </section>
  );
}
