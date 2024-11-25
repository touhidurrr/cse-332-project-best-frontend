import { Routine } from "@/api/types";
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
              {routine.periods.map((name, idx) => (
                <th
                  key={idx}
                  className="border-b border-gray-300 px-6 py-3 text-sm text-center"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            {days.map((day, dayIndex) => (
              <tr key={dayIndex} className="even:bg-gray-50 hover:bg-gray-100">
                {/* Day Column */}
                <td className="border-b border-gray-300 px-6 py-4 font-medium">
                  {day}
                </td>
                {/* Period Columns */}
                {routine.classes[dayIndex]?.map((periodClass, periodIndex) => (
                  <td
                    key={periodIndex}
                    className="border-b border-gray-300 px-6 py-4 text-center"
                  >
                    {periodClass ? (
                      <div className="space-y-1">
                        <div className="text-blue-600 font-semibold">
                          <Link
                            href={`/courses?code=${periodClass.courseCode}`}
                          >
                            {periodClass.courseCode}
                          </Link>
                        </div>
                        <div className="text-gray-600">
                          B{periodClass.building}/{periodClass.room}
                        </div>
                        <div className="text-gray-500">
                          FC:{" "}
                          <Link
                            href={`/froutine?code=${periodClass.facultyCode}`}
                          >
                            <span className="text-gray-800">
                              {periodClass.facultyCode}
                            </span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRoutine;
