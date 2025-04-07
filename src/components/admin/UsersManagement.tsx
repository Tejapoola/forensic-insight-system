
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Mail, 
  Edit,
  Trash2,
  Shield,
  User,
  Check,
  X 
} from 'lucide-react';
import { toast } from 'sonner';

// Sample user data
const sampleUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@forensics.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-04-05T10:30:15',
    assignedCases: 0
  },
  {
    id: '2',
    name: 'John Analyst',
    email: 'john@forensics.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2025-04-06T09:15:30',
    assignedCases: 3
  },
  {
    id: '3',
    name: 'Sarah Expert',
    email: 'sarah@forensics.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2025-04-04T14:22:10',
    assignedCases: 2
  },
  {
    id: '4',
    name: 'David Tech',
    email: 'david@forensics.com',
    role: 'analyst',
    status: 'inactive',
    lastLogin: '2025-03-28T11:05:45',
    assignedCases: 1
  },
  {
    id: '5',
    name: 'Emma Specialist',
    email: 'emma@forensics.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2025-04-05T16:40:20',
    assignedCases: 2
  }
];

const UsersManagement = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'analyst'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle role selection
  const handleRoleChange = (value: string) => {
    setNewUser(prev => ({ ...prev, role: value }));
  };
  
  // Handle add user form submission
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.role) {
      toast.error("All fields are required");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const newUserId = `${users.length + 1}`;
      const createdUser = {
        id: newUserId,
        ...newUser,
        status: 'active',
        lastLogin: new Date().toISOString(),
        assignedCases: 0
      };
      
      setUsers([...users, createdUser]);
      setIsSubmitting(false);
      setIsAddUserOpen(false);
      resetNewUserForm();
      toast.success(`User ${newUser.name} added successfully`);
    }, 1000);
  };
  
  // Reset new user form
  const resetNewUserForm = () => {
    setNewUser({
      name: '',
      email: '',
      role: 'analyst'
    });
  };
  
  // Activate/deactivate user
  const toggleUserStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    const user = users.find(u => u.id === userId);
    toast.success(`User ${user?.name} ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
  };
  
  // Delete user
  const deleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    
    if (user?.assignedCases && user.assignedCases > 0) {
      toast.error(`Cannot delete user with assigned cases. Please reassign cases first.`);
      return;
    }
    
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    toast.success(`User ${user?.name} deleted successfully`);
  };
  
  // Send invitation email
  const sendInvitationEmail = (userId: string) => {
    const user = users.find(u => u.id === userId);
    toast.success(`Invitation email sent to ${user?.email}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9 bg-forensic-dark border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setIsAddUserOpen(true)}
          className="bg-forensic-blue hover:bg-blue-600"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      {/* User statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-forensic-blue/20 mr-4">
            <User className="h-5 w-5 text-forensic-blue" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Users</p>
            <p className="text-xl font-semibold text-white">{users.length}</p>
          </div>
        </div>
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-green-500/20 mr-4">
            <UserCheck className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active Users</p>
            <p className="text-xl font-semibold text-white">
              {users.filter(user => user.status === 'active').length}
            </p>
          </div>
        </div>
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-forensic-purple/20 mr-4">
            <Shield className="h-5 w-5 text-forensic-purple" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Admin Users</p>
            <p className="text-xl font-semibold text-white">
              {users.filter(user => user.role === 'admin').length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Users table */}
      <div className="bg-forensic-dark rounded-lg border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-700">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Last Login</TableHead>
              <TableHead className="text-gray-400">Cases</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-700">
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={
                      user.role === 'admin' 
                        ? 'bg-forensic-purple/20 text-forensic-purple border-forensic-purple/30 border' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30 border'
                    }>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30 border' 
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30 border'
                    }>
                      {user.status === 'active' ? (
                        <span className="flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          Inactive
                        </span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {formatDate(user.lastLogin)}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {user.assignedCases}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => sendInvitationEmail(user.id)}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send Invite</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => toggleUserStatus(user.id, user.status)}
                        >
                          {user.status === 'active' ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              <span>Activate</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem 
                          className="cursor-pointer text-forensic-red hover:bg-gray-800"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-forensic-dark border-gray-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter user details below to create a new account.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Select
                value={newUser.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger id="role" className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddUserOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-forensic-blue hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Creating...</>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
