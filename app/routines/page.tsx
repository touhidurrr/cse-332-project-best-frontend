"use client";
import { getRoutines } from "@/api/api";
import { Routine } from "@/api/types";
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
import uniq from "lodash.uniq";
import { useEffect, useState } from "react";

export default function Routines() {
  const [routines, setRoutines] = useState<Routine[] | null>(null);
  const [routinesToDisplay, setRoutinesToDisplay] = useState(routines);

  const [program, setProgram] = useState<string | null>(null);
  const [intake, setIntake] = useState<number | null>(null);
  const [section, setSection] = useState<string | null>(null);

  const [programs, setPrograms] = useState<string[] | null>(null);
  const [intakes, setIntakes] = useState<number[] | null>(null);
  const [sections, setSections] = useState<string[] | null>(null);

  useEffect(() => {
    getRoutines().then(setRoutines).catch(console.error);
  }, []);

  useEffect(() => {
    if (!routines) return;
    setPrograms(uniq(routines.map((routine) => routine.program)).sort());
  }, [routines, setRoutines]);

  useEffect(() => {
    setIntake(null);
    setIntakes(null);
    if (!routines) return;
    setIntakes(
      uniq(
        routines
          .filter((routine) => routine.program === program)
          .map((routine) => routine.intake),
      ).sort((a, b) => a - b),
    );
  }, [program, setProgram]);

  useEffect(() => {
    setSection(null);
    setSections(null);
    if (!routines || !program) return;
    setSections(
      uniq(
        routines
          .filter(
            (routine) =>
              routine.program === program && routine.intake === intake,
          )
          .map((routine) => routine.section),
      ).sort(),
    );
  }, [intake, setIntake]);

  useEffect(() => {
    if (!routines) return;
    if (program === null && intake === null && section === null) {
      setRoutinesToDisplay(routines);
      return;
    }
    setRoutinesToDisplay(
      routines.filter(
        (routine) =>
          (program === null || routine.program === program) &&
          (intake === null || routine.intake === intake) &&
          (section === null || routine.section === section),
      ),
    );
  }, [routines, program, intake, section, setProgram, setIntake, setSection]);

  return (
    <section className="min-h-full min-w-full flex flex-col gap-2 p-2">
      <div className="flex gap-2 p-1">
        {programs && (
          <Select onValueChange={setProgram}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Program</SelectLabel>
                {programs.map((program, index) => (
                  <SelectItem key={index} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {intakes && (
          <Select onValueChange={(val) => setIntake(parseInt(val))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Intake" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Intake</SelectLabel>
                {intakes.map((intake, index) => (
                  <SelectItem key={index} value={intake.toString()}>
                    {intake}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {sections && (
          <Select onValueChange={setSection}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Section</SelectLabel>
                {sections.map((section, index) => (
                  <SelectItem key={index} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {routinesToDisplay && (
        <section className="flex flex-col gap-4 p-2">
          {routinesToDisplay.map((routine, routineIndex) => (
            <StudentRoutine key={routineIndex} routine={routine} />
          ))}
        </section>
      )}
    </section>
  );
}
