'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Eye, Pencil, Trash } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { hostSistemaService } from '@/src/services/host-sistema.service';
import { ViewDialog } from '@/src/components/host-sistema/view-dialog';
import { CreateDialog } from '@/src/components/host-sistema/create-dialog';
import { EditDialog } from '@/src/components/host-sistema/edit-dialog';
import { CreateHostSistemaDTO, HostSistema, UpdateHostSistemaDTO } from '@/src/types/host-sistema';

const RUC_STORAGE_KEY = 'current_ruc';

export default function HostSistemaPage() {
  const router = useRouter();
  const [hosts, setHosts] = useState<HostSistema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para los diálogos
  const [selectedHost, setSelectedHost] = useState<HostSistema | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    loadHosts();
  }, []);

  const loadHosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hostSistemaService.getAll();
      setHosts(data);
    } catch (error) {
      console.error('Error al cargar hosts del sistema:', error);
      setError('No se pudieron cargar los hosts del sistema');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(RUC_STORAGE_KEY);
    router.push('/login');
  };

  const handleCreate = () => {
    setCreateDialogOpen(true);
  };

  const handleView = async (host: HostSistema) => {
    try {
      const data = await hostSistemaService.getById(host.id);
      setSelectedHost(data);
      setViewDialogOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles:', error);
      alert('No se pudieron obtener los detalles del host');
    }
  };

  const handleEdit = (host: HostSistema) => {
    setSelectedHost(host);
    setEditDialogOpen(true);
  };

  const handleDelete = async (host: HostSistema) => {
    if (!confirm(`¿Está seguro de eliminar el host "${host.hostname}"?`)) {
      return;
    }

    try {
      await hostSistemaService.delete(host.id);
      alert('Host del sistema eliminado correctamente');
      loadHosts();
    } catch (error) {
      console.error('Error al eliminar host:', error);
      alert('No se pudo eliminar el host del sistema');
    }
  };

  const handleCreateSubmit = async (data: CreateHostSistemaDTO) => {
    try {
      await hostSistemaService.create(data);
      alert('Host del sistema creado correctamente');
      loadHosts();
    } catch (error) {
      console.error('Error al crear:', error);
      alert('No se pudo crear el host del sistema');
      throw error;
    }
  };

  const handleEditSubmit = async (id: number, data: UpdateHostSistemaDTO) => {
    try {
      await hostSistemaService.update(id, data);
      alert('Host del sistema actualizado correctamente');
      loadHosts();
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('No se pudo actualizar el host del sistema');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando hosts del sistema...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadHosts}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Hosts del Sistema</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              RUC: {typeof window !== 'undefined' ? localStorage.getItem(RUC_STORAGE_KEY) : '-'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Host
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay hosts del sistema disponibles
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Hostname</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Puerto</TableHead>
                  <TableHead>Usuario DB</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosts.map((host) => (
                  <TableRow key={host.id}>
                    <TableCell className="font-medium">{host.id}</TableCell>
                    <TableCell>{host.hostname || '-'}</TableCell>
                    <TableCell>{host.username || '-'}</TableCell>
                    <TableCell>{host.port || '-'}</TableCell>
                    <TableCell>{host.usernameDB || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(host)}
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(host)}
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(host)}
                          title="Eliminar"
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Diálogos */}
      <ViewDialog host={selectedHost} open={viewDialogOpen} onOpenChange={setViewDialogOpen} />
      <CreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onSubmit={handleCreateSubmit} />
      <EditDialog host={selectedHost} open={editDialogOpen} onOpenChange={setEditDialogOpen} onSubmit={handleEditSubmit} />
    </div>
  );
}