import Aside from "@/components/aside";
import React from "react";

function Dashboard() {
  return (
    <>
      <Aside />
      <main>
        <main className="flex min-h-screen max-w-4/5 ml-auto p-24">
          <div className="w-full border"></div>
        </main>
      </main>
    </>
  );
}

export default Dashboard;
