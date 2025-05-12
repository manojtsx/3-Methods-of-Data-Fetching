"use client";

import { useState, FormEvent } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../methods/crud";
import { toast } from "sonner";
import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  QueryClient,
  QueryClientProvider 
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Wrapper component to provide React Query context
function UserApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserManager />
    </QueryClientProvider>
  );
}

type User = {
  id?: string;
  name: string;
  email: string;
  phone: string;
};

function UserManager() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch users with React Query
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  // Mutation for adding a user
  const addMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("User added successfully!");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    }
  });

  // Mutation for updating a user
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    }
  });

  // Mutation for deleting a user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("User deleted successfully!");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing user
      const userToUpdate = { ...formData, id: editingId };
      updateMutation.mutate(userToUpdate);
      setEditingId(null);
    } else {
      // Add new user
      addMutation.mutate(formData);
    }
    
    // Reset form
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setEditingId(user.id ?? null);
  };

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteMutation.mutate(id);
  };

  // Get loading state for any mutation
  const isSubmitting = addMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold text-center">Method 3: React Query with Automatic Updates</h1>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Data is automatically fetched and updated using React Query
      </p>

      {/* Form Section */}
      <section className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit User" : "Add New User"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : editingId ? "Update" : "Submit"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: "", email: "", phone: "" });
                }}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
      
      {/* Table Section */}
      <section className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold p-6 pb-3">User Details</h2>
        
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="text-center py-4">
              <p>Loading users...</p>
            </div>
          )}
          
          {isError && (
            <div className="text-center py-4 text-red-500">
              <p>Error loading users. Please try again.</p>
            </div>
          )}
          
          {!isLoading && !isError && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          disabled={isSubmitting}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id!)}
                          className={`text-red-600 hover:text-red-900 ${deleteMutation.isPending && deleteMutation.variables === user.id ? 'opacity-50' : ''}`}
                          disabled={isSubmitting}
                        >
                          {deleteMutation.isPending && deleteMutation.variables === user.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No users found. Add a user using the form above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default UserApp;