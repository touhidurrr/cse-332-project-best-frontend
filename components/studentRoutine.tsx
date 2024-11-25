import { Routine } from "@/api/types";
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

const periods = [
  "08:00 AM to 09:15 AM",
  "09:15 AM to 10:30 AM",
  "10:30 AM to 11:45 AM",
  "11:45 AM to 01:00 PM",
  "01:30 PM to 02:45 PM",
  "02:45 PM to 04:00 PM",
  "04:00 PM to 05:15 PM",
  "05:15 PM to 06:30 PM",
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
              {periods.map((name, idx) => (
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
                          {periodClass.courseCode}
                        </div>
                        <div className="text-gray-600">
                          B{periodClass.building}/{periodClass.room}
                        </div>
                        <div className="text-gray-500">
                          FC: {periodClass.facultyCode}
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
