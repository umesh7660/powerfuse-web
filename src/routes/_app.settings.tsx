import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuth } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const user = useAuth((s) => s.user);
  const initials = (user?.name || "U").split(" ").map((p) => p[0]).slice(0, 2).join("");

  return (
    <div>
      <PageHeader title="Settings" description="Profile and workspace preferences." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-sm font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user?.name}</div>
              <div className="text-sm text-muted-foreground capitalize">{user?.role}</div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input defaultValue={user?.name} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input defaultValue={user?.email} />
            </div>
            <div className="col-span-2"><Button type="submit">Save changes</Button></div>
          </form>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-sm font-semibold">Preferences</h2>
          <Row label="Email notifications" defaultChecked />
          <Row label="Slack alerts for urgent tasks" />
          <Row label="Weekly ops digest" defaultChecked />
          <Row label="Dark mode (preview)" />
        </Card>
      </div>
    </div>
  );
}

function Row({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
