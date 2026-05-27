import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SettingsHeaderProps = {
  onSave: () => void;
  isSaving: boolean;
};

export default function SettingsHeader({ onSave, isSaving }: SettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage schedules, services, and general business settings
        </p>
      </div>

      <Button onClick={onSave} disabled={isSaving}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}
