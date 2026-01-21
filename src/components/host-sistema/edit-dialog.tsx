import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { HostSistema, UpdateHostSistemaDTO } from '@/src/types/host-sistema';

interface EditDialogProps {
  host: HostSistema | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: UpdateHostSistemaDTO) => Promise<void>;
}

export function EditDialog({ host, open, onOpenChange, onSubmit }: EditDialogProps) {
  const [formData, setFormData] = useState<UpdateHostSistemaDTO>({
    hostname: '',
    username: '',
    password: '',
    port: '',
    usernameDB: '',
    passDB: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (host) {
      setFormData({
        hostname: host.hostname || '',
        username: host.username || '',
        password: '',
        port: host.port || '',
        usernameDB: host.usernameDB || '',
        passDB: '',
      });
    }
  }, [host]);

  const handleChange = (field: keyof UpdateHostSistemaDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!host) return;

    setLoading(true);
    try {
      await onSubmit(host.id, formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error al editar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!host) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Host del Sistema</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ID</Label>
              <Input value={host.id} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostname">Hostname</Label>
              <Input
                id="hostname"
                value={formData.hostname}
                onChange={(e) => handleChange('hostname', e.target.value)}
                placeholder="Ingrese el hostname"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Ingrese el username"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (dejar vacío para no cambiar)</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Nueva contraseña"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Puerto</Label>
              <Input
                id="port"
                value={formData.port}
                onChange={(e) => handleChange('port', e.target.value)}
                placeholder="Ingrese el puerto"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usernameDB">Usuario DB</Label>
              <Input
                id="usernameDB"
                value={formData.usernameDB}
                onChange={(e) => handleChange('usernameDB', e.target.value)}
                placeholder="Ingrese el usuario de la base de datos"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passDB">Password DB (dejar vacío para no cambiar)</Label>
              <Input
                id="passDB"
                type="password"
                value={formData.passDB}
                onChange={(e) => handleChange('passDB', e.target.value)}
                placeholder="Nueva contraseña de la base de datos"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}