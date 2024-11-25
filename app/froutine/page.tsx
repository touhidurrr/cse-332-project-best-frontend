"use client";
import { getFacultyCodes, getFacultyInfo } from "@/api/api";
import { FacultyInfo } from "@/api/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import FacultyRoutine from "@/components/facultyRoutine";
import { useSearchParams } from "next/navigation";

export default function Routines() {
  const searchParams = useSearchParams();
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyCode, setFacultyCode] = useState<string | null>(null);
  const [facultyCodes, setFacultyCodes] = useState<string[] | null>(null);

  useEffect(() => {
    setFacultyCode(searchParams.get("facultyCode"));
    getFacultyCodes()
      .then((codes) => setFacultyCodes(codes.sort()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (facultyCode)
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
