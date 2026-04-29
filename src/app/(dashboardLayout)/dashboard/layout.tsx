import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userRoute } from "../../components/service/users";
import DashboardSidebar from "./DashboardSidebar";
import "../../globals.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;

  try {
    // Get cookies to forward to the API call
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    // Fetch user from API instead of session
    user = await userRoute.getMe({
      headers: {
        Cookie: cookieString,
      },
    });

    if (!user || (!user.email && !user.id)) {
      redirect("/login");
    }
  } catch (error) {
    console.error("Error fetching user in DashboardLayout:", error);
    redirect("/login");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#000000] text-white min-h-screen font-sans antialiased">
        <DashboardSidebar user={user}>
          {children}
        </DashboardSidebar>
      </body>
    </html>
  );
}