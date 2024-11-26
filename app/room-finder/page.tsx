"use client";
import { getBuildingRoomsMap, getClasses } from "@/api/api";
import { BuildingRoomsMap, RoutineClass } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns/addDays";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

type BookedClass = {
  day: Date;
  building: string;
  room: string;
  pIdx: number; // period index
};

type BuildingRoomRoutinesMap = {
  [building: string]: {
    [room: string]: (RoutineClass | null)[][];
  };
};

export default function RoomFinder() {
  const [building, setBuilding] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const [buildingRoomsMap, setBuildingRoomsMap] =
    useState<BuildingRoomsMap | null>(null);
  const [buildingRoomRoutinesMap, setBuildingRoomRoutinesMap] =
    useState<BuildingRoomRoutinesMap | null>(null);

  const [rClasses, setRClasses] = useState<RoutineClass[] | null>(null);
  const [bookedClasses, setBookedClasses] = useState<BookedClass[]>([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [date, setDate] = useState<DateRange>({
    from: today,
    to: addDays(today, 7),
  });

  function getDays() {
    const dates: Date[] = [];
    let curDate = date.from!;
    while (curDate <= date.to!) {
      dates.push(curDate);
      curDate = addDays(curDate, 1);
    }
    return dates;
  }

  useEffect(() => {
    getBuildingRoomsMap().then(setBuildingRoomsMap).catch(console.error);

    const bookedClassesJSON = localStorage.getItem("bookedClasses");
    if (bookedClassesJSON === null) {
      localStorage.setItem("bookedClasses", JSON.stringify([]));
    } else {
      setBookedClasses(JSON.parse(bookedClassesJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookedClasses", JSON.stringify(bookedClasses));
  }, [bookedClasses]);

  useEffect(() => {
    getClasses(building, room).then(setRClasses).catch(console.error);
  }, [building, room]);

  useEffect(() => {
    if (buildingRoomsMap === null) return;

    const newBuildingRoomRoutinesMap: BuildingRoomRoutinesMap = {};

    (building === null ? Object.keys(buildingRoomsMap) : [building]).forEach(
      (building) => {
        newBuildingRoomRoutinesMap[building] = {};
        (room === null ? buildingRoomsMap[building] : [room]).forEach(
          (room) => {
            newBuildingRoomRoutinesMap[building][room] = Array(7)
              .fill(null)
              .map(() => Array(8).fill(null));
          },
        );
      },
    );

    if (rClasses)
      rClasses.forEach((rCls) => {
        newBuildingRoomRoutinesMap[rCls.cls.building][rCls.cls.room][rCls.dIdx][
          rCls.pIdx
        ] = rCls;
      });

    setBuildingRoomRoutinesMap(newBuildingRoomRoutinesMap);
  }, [rClasses, building, room, buildingRoomsMap]);

  return (
    <section className="flex flex-col m-2 gap-2 p-2">
      <div className="flex m-2 gap-2 p-2">
        <div className={cn("grid gap-2", "")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={(sel) => sel && setDate(sel)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {buildingRoomsMap && (
          <Select onValueChange={setBuilding} value={building || undefined}>
            <SelectTrigger className="w-55 p-2">
              <SelectValue placeholder="Select Building (Optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Building</SelectLabel>
                {Object.keys(buildingRoomsMap).map((name, idx) => (
                  <SelectItem key={idx} value={name}>
                    {/^\d+$/.test(name) ? `B${name}` : name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {buildingRoomsMap && building && buildingRoomsMap[building] && (
          <Select onValueChange={setRoom} value={room || undefined}>
            <SelectTrigger className="w-[180px] p-2">
              <SelectValue placeholder="Select Room (Optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Room</SelectLabel>
                {buildingRoomsMap[building].sort().map((room, idx) => (
                  <SelectItem key={idx} value={room}>
                    {room}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Show Unoccupied Classes Here */}
      <div className="flex flex-col gap-4">
        {buildingRoomRoutinesMap &&
          Object.entries(buildingRoomRoutinesMap).map(([building, rooms]) =>
            Object.entries(rooms).map(([room, routine]) => (
              <div
                key={`${building}-${room}`}
                className="border p-4 rounded-md"
              >
                <h3 className="font-bold">
                  Building: {building}, Room: {room}
                </h3>
                <table className="table-auto w-full mt-2 text-left border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border p-2">Day</th>
                      <th className="border p-2">Period</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDays().map((currentDate, dateIdx) => {
                      const dIdx = (currentDate.getDay() + 6) % 7;
                      return routine[dIdx].map((slot, pIdx) => {
                        console.log(slot);
                        const isBooked = bookedClasses.some(
                          (b) =>
                            b.building === building &&
                            b.room === room &&
                            b.day.getTime() === currentDate.getTime() &&
                            b.pIdx === pIdx,
                        );

                        return (
                          <tr key={`${dateIdx}-${dIdx}-${pIdx}`}>
                            <td className="border p-2">
                              {format(currentDate, "EEEE, MMM d")}
                            </td>
                            <td className="border p-2">{`Period ${
                              pIdx + 1
                            }`}</td>
                            <td className="border p-2">
                              {slot
                                ? `Occupied (${slot.cls.facultyCode})`
                                : isBooked
                                  ? "Booked"
                                  : "Unoccupied"}
                            </td>
                            <td className="border p-2">
                              {!slot && !isBooked && (
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setBookedClasses((prev) => [
                                      ...prev,
                                      {
                                        building,
                                        room,
                                        day: currentDate,
                                        pIdx,
                                      },
                                    ]);
                                  }}
                                >
                                  Book
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            )),
          )}
      </div>
    </section>
  );
}
