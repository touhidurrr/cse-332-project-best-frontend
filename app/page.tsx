"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { features } from "./features";

export default function Home() {
  return (
    <div className="h-full w-full p-4">
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#2c3e50",
          textAlign: "center",
          marginTop: "20px",
          textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
        }}
      >
        BEST: BUBT Enhanced Schedule Tracker
      </h1>
      <section about="Features" className="w-full grid grid-cols-3 gap-4 m-4">
        {features.map((feature) => (
          <Link href={feature.url} key={feature.title}>
            <Card>
              <CardHeader>
                <CardTitle className="flex basis-1/3 flex-auto items-center gap-2">
                  <feature.icon className="size-5" /> {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
