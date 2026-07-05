"use client";

import { useState } from "react";
import AgencyForm from "@/components/admin/AgencyForm";
import AdminAgencyTable from "@/components/admin/AdminAgencyTable";

export default function AgenciesPage() {
  const [showForm, setShowForm] = useState(false);

  const fetchAgencies = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {showForm && (
        <AgencyForm
          onClose={() => setShowForm(false)}
          refresh={fetchAgencies}
        />
      )}

      <AdminAgencyTable />
    </div>
  );
}