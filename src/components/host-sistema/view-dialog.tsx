import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { HostSistema } from '@/src/types/host-sistema';

interface ViewDialogProps {
  host: HostSistema | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewDialog({ host, open, onOpenChange }: ViewDialogProps) {
  if (!host) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del Host del Sistema</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">ID</label>
            <p className="text-base">{host.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Hostname</label>
            <p className="text-base">{host.hostname || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Username</label>
            <p className="text-base">{host.username || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Puerto</label>
            <p className="text-base">{host.port || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Usuario DB</label>
            <p className="text-base">{host.usernameDB || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}