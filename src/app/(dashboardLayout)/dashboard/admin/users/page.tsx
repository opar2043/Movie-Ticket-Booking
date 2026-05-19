import React from "react";
import { User as UserIcon, Calendar } from "lucide-react";
import { userRoute } from "@/src/app/components/service/users";
import UserActions from "@/src/app/components/Layout/UserActions";
import { UserRole } from "@/src/app/(auth)/useAuth";

export default async function UsersPage() {
  const responseData = await userRoute.getUsers();
  const users = Array.isArray(responseData) ? responseData : responseData?.data || [];

  return (
    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <UserIcon className="w-6 h-6 text-[#E50914]" />
            Manage Users
          </h1>
          <p className="text-gray-400 mt-1">View and manage all registered CineVerse users.</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#000000] border-b border-[#2B2B2B] text-gray-400 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined At</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B2B2B]">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-[#000000] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img src={user.image} alt={user.name!} className="w-10 h-10 rounded-sm object-cover border border-[#2B2B2B]" />
                        ) : (
                          <div className="w-10 h-10 rounded-sm bg-[#E50914]/10 text-[#E50914] flex items-center justify-center font-bold border border-[#E50914]/20">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                        )}
                        <span className="font-medium text-white">{user.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.email || "No Email"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest ${
                        user.role === UserRole.ADMIN ? 'bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30' : 'bg-gray-800 text-gray-300 border border-gray-700'
                      }`}>
                        {user.role || UserRole.USER}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <UserActions
                        userId={user.id}
                        userName={user.name || "Unknown"}
                        currentRole={user.role || UserRole.USER}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}