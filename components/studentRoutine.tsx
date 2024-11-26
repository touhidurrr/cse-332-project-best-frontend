import { Routine } from "@/api/types";
import uniq from "lodash.uniq";
import Link from "next/link";
import React from "react";

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const StudentRoutine: React.FC<{ routine: Routine }> = ({ routine }) => {
  let dayIndexes: number[] = [];
  let periodIndexes: number[] = [];

  for (let d = 0; d < 7; d++) {
    for (let p = 0; p < routine.periods.length; p++) {
      if (routine.classes[d][p] !== null) {
        dayIndexes.push(d);
        periodIndexes.push(p);
      }
    }
  }

  dayIndexes = uniq(dayIndexes).sort((a, b) => a - b);
  periodIndexes = uniq(periodIndexes).sort((a, b) => a - b);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white">
      {/* Routine Header */}
      <div className="bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">
          {routine.program} - Intake {routine.intake}, Section {routine.section}
          , Semester {routine.semester}
        </h2>
      </div>

      {/* Routine Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border-b border-gray-300 px-6 py-3 text-lg">
                Day
              </th>
              {periodIndexes.map((pIdx) => (
                <th
                  key={pIdx}
                  className="border-b border-gray-300 px-6 py-3 text-sm text-center"
                >
                  {routine.periods[pIdx]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            {dayIndexes.map((dIdx) => (
              <tr key={dIdx} className="even:bg-gray-50 hover:bg-gray-100">
                {/* Day Column */}
                <td className="border-b border-gray-300 px-6 py-4 font-medium">
                  {days[dIdx]}
                </td>
                {/* Period Columns */}
                {periodIndexes.map((pIdx) => {
                  const pClass = routine.classes[dIdx][pIdx];
                  return (
                    <td
                      key={pIdx}
                      className="border-b border-gray-300 px-6 py-4 text-center"
                    >
                      {pClass ? (
                        <div className="space-y-1">
                          <div className="text-blue-600 font-semibold">
                            <Link href={`/courses?code=${pClass.courseCode}`}>
                              {pClass.courseCode}
                            </Link>
                          </div>
                          <div className="text-gray-600">
                            B{pClass.building}/{pClass.room}
                          </div>
                          <div className="text-gray-500">
                            FC:{" "}
                            <Link href={`/froutine?code=${pClass.facultyCode}`}>
                              <span className="text-gray-800">
                                {pClass.facultyCode}
                              </span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRoutine;
