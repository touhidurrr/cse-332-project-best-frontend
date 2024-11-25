"use client";
import { getFacultyCodes, getFacultyInfo } from "@/api/api";
import { FacultyInfo } from "@/api/types";
import FacultyRoutine from "@/components/facultyRoutine";
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

export default function Routines() {
  const searchParams = useSearchParams();
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyCode, setFacultyCode] = useState<string | null>(null);
  const [facultyCodes, setFacultyCodes] = useState<string[] | null>(null);

  useEffect(() => {
    setFacultyCode(searchParams.get("code"));
    getFacultyCodes()
      .then((codes) => setFacultyCodes(codes.sort()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!facultyCode) return;
    getFacultyInfo(facultyCode).then(setFacultyInfo).catch(console.error);
  }, [facultyCode]);

  return (
    <section className="flex flex-col m-2 gap-2 p-2">
      {facultyCodes && (
        <Select onValueChange={setFacultyCode} value={facultyCode || undefined}>
          <SelectTrigger className="w-[180px]">
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
