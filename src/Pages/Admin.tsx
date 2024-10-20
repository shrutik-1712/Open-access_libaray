import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface Member {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface TeamMember extends Member {
  role: string;
}

interface Alumni {
  _id: string;
  name: string;
  designation: string;
  batch: string;
  image: string;
}

const API_URL = 'http://localhost:3001/api';

// Hardcoded credentials (replace with your desired username and password)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

const AdminPanel: React.FC = () => {
  const [advisoryData, setAdvisoryData] = useState<Member[]>([]);
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Member | TeamMember | Alumni | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', description: '', designation: '', batch: '', image: null as File | null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('advisory');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const advisoryResponse = await fetch(`${API_URL}/advisoryCommittee`);
      const teamResponse = await fetch(`${API_URL}/libraryTeam`);
      const alumniResponse = await fetch(`${API_URL}/alumni`);
      if (!advisoryResponse.ok || !teamResponse.ok || !alumniResponse.ok) {
        throw new Error('Failed to fetch data');
      }
      const advisoryData = await advisoryResponse.json();
      const teamData = await teamResponse.json();
      const alumniData = await alumniResponse.json();
      setAdvisoryData(advisoryData);
      setTeamData(teamData);
      setAlumniData(alumniData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USERNAME && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      fetchData();
    } else {
      toast.error('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setAdvisoryData([]);
    setTeamData([]);
    setAlumniData([]);
  };

  const handleCreate = () => {
    setCurrentItem(null);
    setFormData({ name: '', role: '', description: '', designation: '', batch: '', image: null });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Member | TeamMember | Alumni) => {
    setCurrentItem(item);
    setFormData({ 
      name: item.name, 
      role: 'role' in item ? item.role : '', 
      description: 'description' in item ? item.description : '',
      designation: 'designation' in item ? item.designation : '',
      batch: 'batch' in item ? item.batch : '',
      image: null 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (name: string) => {
    try {
      let endpoint;
      switch (activeTab) {
        case 'advisory':
          endpoint = 'advisoryCommittee';
          break;
        case 'team':
          endpoint = 'libraryTeam';
          break;
        case 'alumni':
          endpoint = 'alumni';
          break;
        default:
          throw new Error('Invalid tab');
      }
      const response = await fetch(`${API_URL}/${endpoint}/${encodeURIComponent(name)}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete ${activeTab} member`);
      }
      toast.success(`${activeTab} member deleted successfully`);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error(`Failed to delete ${activeTab} member`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    if (activeTab === 'team') {
      formDataToSend.append('role', formData.role);
      formDataToSend.append('description', formData.description);
    } else if (activeTab === 'advisory') {
      formDataToSend.append('description', formData.description);
    } else if (activeTab === 'alumni') {
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('batch', formData.batch);
    }
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      let endpoint;
      switch (activeTab) {
        case 'advisory':
          endpoint = 'advisoryCommittee';
          break;
        case 'team':
          endpoint = 'libraryTeam';
          break;
        case 'alumni':
          endpoint = 'alumni';
          break;
        default:
          throw new Error('Invalid tab');
      }
      const url = currentItem ? `${API_URL}/${endpoint}/${encodeURIComponent(currentItem.name)}` : `${API_URL}/${endpoint}`;
      const method = currentItem ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error(`Failed to save ${activeTab} member`);
      }
      toast.success(`${activeTab} member ${currentItem ? 'updated' : 'created'} successfully`);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error(`Failed to save ${activeTab} member`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: fileInput.files ? fileInput.files[0] : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            className="mb-2"
          />
          <Input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className="mb-2"
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="advisory">Advisory Committee</TabsTrigger>
          <TabsTrigger value="team">Library Team</TabsTrigger>
          <TabsTrigger value="alumni">Alumni</TabsTrigger>
        </TabsList>
        <TabsContent value="advisory">
          <Button onClick={handleCreate} className="mb-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Member
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advisoryData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <img src={`http://localhost:3001${item.image}`} alt={item.name} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.name)} className="ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="team">
          <Button onClick={handleCreate} className="mb-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <img src={`http://localhost:3001${item.image}`} alt={item.name} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.name)} className="ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="alumni">
          <Button onClick={handleCreate} className="mb-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Alumni
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alumniData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.designation}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>
                    <img src={`http://localhost:3001${item.image}`} alt={item.name} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.name)} className="ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit' : 'Add New'} {activeTab === 'advisory' ? 'Member' : activeTab === 'team' ? 'Team Member' : 'Alumni'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              {activeTab === 'team' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    Role
                  </label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              )}
              {(activeTab === 'advisory' || activeTab === 'team') && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              )}
              {activeTab === 'alumni' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="designation" className="text-right">
                      Designation
                    </label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="batch" className="text-right">
                      Batch
                    </label>
                    <Input
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="image" className="text-right">
                  Image
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">{currentItem ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;