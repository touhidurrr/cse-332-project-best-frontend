"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <section className="min-h-full min-w-full flex flex-col justify-center items-center">
      <div className="flex">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Building" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Department</SelectLabel>
              <SelectItem value="b2">B2</SelectItem>
              <SelectItem value="b3">B3</SelectItem>
              <SelectItem value="b4">B4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Room" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Intake</SelectLabel>
              <SelectItem value="room-313">Room 313</SelectItem>
              <SelectItem value="room-314">Room 314</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
