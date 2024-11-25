import { FacultyClass, FacultyInfo } from "@/api/types";
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

function periodToDate(period: string): Date {
  const date = new Date();

  const firstTime = period.split(" to ")[0];
  const [hourMinute, meridian] = firstTime.split(" ");
  let [hours, minutes] = hourMinute.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  date.setHours(hours, minutes, 0, 0);
  return date;
}

const FacultyRoutine: React.FC<{ facultyInfo: FacultyInfo }> = ({
  facultyInfo,
}) => {
  const periods: string[] = [
    ...new Set(facultyInfo.classes.map((cls) => cls.period)),
  ].sort((a, b) => periodToDate(a).getTime() - periodToDate(b).getTime());

  const classes: (FacultyClass | null)[][] = new Array(7)
    .fill(null)
    .map(() => new Array(periods.length).fill(null));

  facultyInfo.classes.forEach((cls) => {
    const periodIdx = periods.indexOf(cls.period);
    classes[cls.dayIdx][periodIdx] = cls;
  });

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white">
      {/* Routine Header */}
      <div className="bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">
          {facultyInfo.code}: {facultyInfo.name}
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
            {days.map((day, dayIdx) => (
              <tr key={dayIdx} className="even:bg-gray-50 hover:bg-gray-100">
                {/* Day Column */}
                <td className="border-b border-gray-300 px-6 py-4 font-medium">
                  {day}
                </td>
                {/* Period Columns */}
                {classes[dayIdx].map((cls, clsIdx) => (
                  <td
                    key={clsIdx}
                    className="border-b border-gray-300 px-6 py-4 text-center"
                  >
                    {cls ? (
                      <div className="space-y-1">
                        <div className="text-blue-600 font-semibold">
                          {cls.courseCode}
                        </div>
                        <div className="text-gray-600">
                          B{cls.building}/{cls.room}
                        </div>
                        <div className="text-gray-500">{cls.program}</div>
                        <div className="text-gray-500">
                          {cls.intake}/{cls.section}
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

export default FacultyRoutine;
