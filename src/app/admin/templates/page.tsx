import AdminTemplateTable from "@/components/admin/AdminTemplateTable";

export default function AdminTemplatesPage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Templates</h1>
      <AdminTemplateTable />
    </main>
  );
}