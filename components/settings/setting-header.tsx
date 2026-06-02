import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Show, UserButton } from "@clerk/nextjs";

type SettingsHeaderProps = {
  onSave: () => void;
  isSaving: boolean;
};

export default function SettingsHeader({ onSave, isSaving }: SettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div>
        <h1 className="text-xl font-semibold">System Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage schedules, services, and general business settings
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Show when="signed-in">
          <UserButton showName appearance={{
            elements: { userButtonBox: "max-w-[140px]" }
          }} />
        </Show>

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
    </div>
  );
}