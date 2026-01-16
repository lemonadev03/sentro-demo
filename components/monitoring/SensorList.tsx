import { cn } from "@/lib/utils";
import SensorCard from "./SensorCard";
import type { SensorStatus } from "@/lib/monitoring-data";

type SensorData = {
  id: string;
  name: string;
  waterLevel: number;
  status: SensorStatus;
  rateOfChange?: string;
};

type SensorListProps = {
  sensors: SensorData[];
  onSensorClick?: (id: string) => void;
  className?: string;
};

export default function SensorList({
  sensors,
  onSensorClick,
  className,
}: SensorListProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        River Sensors
      </h3>
      <div className="flex flex-col gap-2">
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            id={sensor.id}
            name={sensor.name}
            waterLevel={sensor.waterLevel}
            status={sensor.status}
            rateOfChange={sensor.rateOfChange}
            onClick={onSensorClick ? () => onSensorClick(sensor.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
