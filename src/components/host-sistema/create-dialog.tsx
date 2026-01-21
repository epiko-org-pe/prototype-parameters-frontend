import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { CreateHostSistemaDTO } from '@/src/types/host-sistema';

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateHostSistemaDTO) => Promise<void>;
}

export function CreateDialog({ open, onOpenChange, onSubmit }: CreateDialogProps) {
  const [formData, setFormData] = useState<CreateHostSistemaDTO>({
    hostname: '',
    username: '',
    password: '',
    port: '',
    usernameDB: '',
    passDB: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof CreateHostSistemaDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        hostname: '',
        username: '',
        password: '',
        port: '',
        usernameDB: '',
        passDB: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error al crear:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Host del Sistema</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Ingrese la contraseña"
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
              <Label htmlFor="passDB">Password DB</Label>
              <Input
                id="passDB"
                type="password"
                value={formData.passDB}
                onChange={(e) => handleChange('passDB', e.target.value)}
                placeholder="Ingrese la contraseña de la base de datos"
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
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}