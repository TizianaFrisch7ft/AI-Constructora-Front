// src/components/ScheduleFilters.tsx
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ScheduleFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  project: string;
  onProjectChange: (v: string) => void;
  onClear: () => void;
  projectOptions: string[];
}

export default function ScheduleFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  project,
  onProjectChange,
  onClear,
  projectOptions,
}: ScheduleFiltersProps) {
  return (
    <div className="border p-4 rounded-xl bg-muted/50 flex flex-wrap gap-4 items-center">
      <Input
        placeholder="🔍 Buscar cronogramas..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-[200px]"
      />
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="min-w-[160px]">
          <SelectValue placeholder="Todos los estados" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos los estados</SelectItem>
          <SelectItem value="WIP">WIP</SelectItem>
          <SelectItem value="Waiting">Waiting</SelectItem>
          <SelectItem value="Close">Close</SelectItem>
        </SelectContent>
      </Select>

      <Select value={project} onValueChange={onProjectChange}>
        <SelectTrigger className="min-w-[160px]">
          <SelectValue placeholder="Todos los proyectos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos los proyectos</SelectItem>
          {projectOptions.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="ghost" onClick={onClear}>
        Limpiar filtros
      </Button>
    </div>
  );
}
