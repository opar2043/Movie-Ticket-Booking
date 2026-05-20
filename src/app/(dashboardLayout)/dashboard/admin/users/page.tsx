import React from "react";
import { User as UserIcon, Calendar } from "lucide-react";
import { userRoute } from "@/src/app/components/service/users";
import UserActions from "@/src/app/components/Layout/UserActions";
import { UserRole } from "@/src/app/(auth)/useAuth";

export default async function UsersPage() {
  const responseData = await userRoute.getUsers();
  const users = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
          Members · {users.length} accounts
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Manage the{" "}
          <span className="italic font-serif text-white/80">community.</span>
        </h1>
        <p className="text-white/55 mt-3 max-w-xl text-sm">
          Promote, demote and remove members. Be considerate — they're the
          reason this studio exists.
        </p>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#23262B] border border-white/8 overflow-hidden luxury-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#121315] border-b border-white/8">
              <tr>
                {["User", "Email", "Joined", "Role", "Actions"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-white/45 ${
                      i === 4 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-white/55">
                      <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <p className="text-base font-medium text-white">
                        No members yet
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name!}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center font-medium text-sm text-white">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                        )}
                        <span className="font-medium text-white">
                          {user.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {user.email || "No email"}
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      <div className="inline-flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-white/45" />
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${
                          user.role === UserRole.ADMIN
                            ? "bg-white text-[#121315] font-medium"
                            : "bg-white/[0.06] text-white/80 border border-white/10"
                        }`}
                      >
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
