// src/components/CreateScheduleModal.tsx
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

interface CreateScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Project {
  id: string;
  name: string;
}

interface PM {
  id: string;
  fullName: string;
}

const STATUS_OPTIONS = ["WIP", "Waiting", "Close"];

export default function CreateScheduleModal({ open, onClose, onSuccess }: CreateScheduleModalProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pms, setPMs] = useState<PM[]>([]);

  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [pmId, setPmId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("WIP");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (!open) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data.projects));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pms`)
      .then((res) => res.json())
      .then((data) => setPMs(data.pms));
  }, [open]);

  const handleSubmit = async () => {
    const cc_id = "CC" + Math.floor(1000 + Math.random() * 9000); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SCHEDULES}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cc_id, description, project_id: projectId, pm_id: pmId, date, status, comments }),
    });

    const result = await res.json();
    if (result.success) {
      onSuccess();
      onClose();
    } else {
      alert("Error al crear cronograma: " + (result.error || "Desconocido"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Crear Nuevo Cronograma de Compras</h2>

        <div>
          <Label>Descripción *</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <Label>Proyecto *</Label>
          <Select onValueChange={setProjectId} value={projectId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar proyecto" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Project Manager *</Label>
          <Select onValueChange={setPmId} value={pmId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar PM" />
            </SelectTrigger>
            <SelectContent>
              {pms.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.fullName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Fecha *</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <Label>Estado *</Label>
          <Select onValueChange={setStatus} value={status}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Comentarios</Label>
          <Textarea value={comments} onChange={(e) => setComments(e.target.value)} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Crear Cronograma</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}