'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiService, QueueItem } from '@/lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QueueItem | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    isUrgent: false,
    notes: '',
  });

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      const data = await apiService.getQueue();
      setQueueItems(data);
    } catch (error) {
      console.error('Failed to load queue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiService.updateQueueStatus(editingItem.id, editingItem.status);
      } else {
        await apiService.createQueueItem(formData);
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ patientName: '', patientPhone: '', isUrgent: false, notes: '' });
      loadQueue();
    } catch (error) {
      console.error('Failed to save queue item:', error);
    }
  };

  const handleStatusUpdate = async (id: number, status: QueueItem['status']) => {
    try {
      await apiService.updateQueueStatus(id, status);
      loadQueue();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this queue item?')) {
      try {
        await apiService.deleteQueueItem(id);
        loadQueue();
      } catch (error) {
        console.error('Failed to delete queue item:', error);
      }
    }
  };

  const getStatusBadge = (status: QueueItem['status']) => {
    const variants = {
      waiting: 'default',
      with_doctor: 'secondary',
      completed: 'outline',
    } as const;

    return <Badge variant={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Queue</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Patient</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient to Queue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientPhone">Phone Number</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isUrgent"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                />
                <Label htmlFor="isUrgent">Urgent Case</Label>
              </div>
              <Button type="submit" className="w-full">
                Add to Queue
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Queue #</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgent</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queueItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold">{item.queueNumber}</TableCell>
                  <TableCell>{item.patientName}</TableCell>
                  <TableCell>{item.patientPhone}</TableCell>
                  <TableCell>
                    <Select
                      value={item.status}
                      onValueChange={(value: QueueItem['status']) => handleStatusUpdate(item.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="with_doctor">With Doctor</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {item.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{item.notes}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
