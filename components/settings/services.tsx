"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ServiceType } from "@/types/SettingsType";

type SettingsServicesProps = {
  services: ServiceType[];
  onChangeServices: (services: ServiceType[]) => void;
};

const EMPTY_SERVICE: Omit<ServiceType, "id"> = {
  name: "",
  description: "",
  durationInMinutes: 30,
  price: 0,
  isActive: true,
};

export default function SettingsServices({
  services,
  onChangeServices,
}: SettingsServicesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Omit<ServiceType, "id">>({
    ...EMPTY_SERVICE,
  });

  function updateService<K extends keyof ServiceType>(
    id: string | undefined,
    field: K,
    value: ServiceType[K]
  ) {
    onChangeServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  }

  function removeService(id: string | undefined) {
    onChangeServices(services.filter((service) => service.id !== id));
  }

  function addService() {
    if (!newService.name.trim()) return;

    onChangeServices([
      ...services,
      { ...newService } as ServiceType,
    ]);

    setNewService({ ...EMPTY_SERVICE });
    setIsDialogOpen(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Services Management</CardTitle>
          <CardDescription>
            Configure offered services, prices, and durations
          </CardDescription>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Service</DialogTitle>
              <DialogDescription>
                Fill in the details for the new service
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={newService.name}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Ex: Haircut, Massage..."
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={newService.description ?? ""}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Optional description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (€)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={newService.price}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (min)</Label>
                  <Input
                    type="number"
                    min={1}
                    value={newService.durationInMinutes}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        durationInMinutes: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label>Active</Label>
                <Switch
                  checked={newService.isActive}
                  onCheckedChange={(checked) =>
                    setNewService((prev) => ({ ...prev, isActive: checked }))
                  }
                />
              </div>

              <Button
                onClick={addService}
                className="w-full"
                disabled={!newService.name.trim()}
              >
                Add Service
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-4">
        {services.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            No services added yet.
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id ?? service.name}
              className="rounded-lg border p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={service.isActive}
                    onCheckedChange={(checked) =>
                      updateService(service.id, "isActive", checked)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeService(service.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={service.name}
                  onChange={(e) =>
                    updateService(service.id, "name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={service.description ?? ""}
                  onChange={(e) =>
                    updateService(service.id, "description", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (€)</Label>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) =>
                      updateService(service.id, "price", Number(e.target.value))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (min)</Label>
                  <Input
                    type="number"
                    value={service.durationInMinutes}
                    onChange={(e) =>
                      updateService(
                        service.id,
                        "durationInMinutes",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
