"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Schedule {
  _id: string;
  cc_id: string;
  description: string;
  project_id: string;
  pm_id: string;
  date: string;
  status: string;
}

interface ScheduleRowProps {
  schedule: Schedule;
}

export default function ScheduleRow({ schedule }: ScheduleRowProps) {
  const [projectName, setProjectName] = useState(schedule.project_id);
  const [pmName, setPmName] = useState(schedule.pm_id);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
       const project = data.projects.find((p: any) => p._id === schedule.project_id);



        if (project) setProjectName(project.name);
      });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pms`)
      .then((res) => res.json())
      .then((data) => {
        const pm = data.pms.find((p: any) => p.id === schedule.pm_id);
        if (pm) setPmName(pm.fullName);
      });
  }, [schedule.project_id, schedule.pm_id]);

  return (
    <>
      <td className="p-2 text-center">{schedule.cc_id}</td>
      <td className="p-2 text-center">{schedule.description}</td>
      <td className="p-2 text-center">{projectName}</td>
      <td className="p-2 text-center">{pmName}</td>
      <td className="p-2 text-center">{new Date(schedule.date).toLocaleDateString()}</td>
      <td className="p-2 text-center">
        <Badge variant={schedule.status === "Close" ? "destructive" : "outline"}>
          {schedule.status}
        </Badge>
      </td>
    </>
  );
}
