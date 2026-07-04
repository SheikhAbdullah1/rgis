"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface ProposalFormProps {
  setFormCompleted: Dispatch<SetStateAction<boolean>>;
}

export default function ProposalForm({ setFormCompleted }: ProposalFormProps) {
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [grants, setGrants] = useState<any[]>([]);

  // Single formData state
  const [formData, setFormData] = useState({
    role: "",
    submissionType: "",
    agency: "",
    grant: "",
    title: "",
    funding: "",
    description: "",
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    country: "",
    website: "",
    organization: "",
  });

  useEffect(() => {
    fetch("/api/agencies")
      .then((res) => res.json())
      .then((data) => { if (data.success) setAgencies(data.agencies); });

    fetch("/api/grants")
      .then((res) => res.json())
      .then((data) => { if (data.success) setGrants(data.grants); });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.role) newErrors.role = "Role is required.";
    if (!formData.submissionType) newErrors.submissionType = "Submission type is required.";
    if (!formData.title.trim()) newErrors.title = "Proposal title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.cnic.trim()) newErrors.cnic = "CNIC is required.";
    if (!proposalFile) newErrors.proposalFile = "Proposal document is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) {
      toast.error("Please complete all required fields.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (proposalFile) form.append("proposalFile", proposalFile);

      const res = await fetch("/api/proposals", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed.");

      setFormCompleted(true);
      toast.success(data.message);

      setFormData({
        role: "", submissionType: "", agency: "", grant: "",
        title: "", funding: "", description: "", fullName: "",
        email: "", phone: "", cnic: "", country: "", website: "", organization: "",
      });
      setProposalFile(null);
      setErrors({});
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Submit Proposal</h2>

      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">

        {/* Role */}
        <div>
          <label className="block mb-2 font-medium">Select Your Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded-lg p-3">
            <option value="">Select Role</option>
            <option>Researcher</option>
            <option>Student</option>
            <option>Faculty Member</option>
            <option>Startup Founder</option>
            <option>NGO Representative</option>
            <option>Organization</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Submission Type */}
        <div>
          <label className="block mb-2 font-medium">Submission Type</label>
          <select name="submissionType" value={formData.submissionType} onChange={handleChange} className="w-full border rounded-lg p-3">
            <option value="">Select Type</option>
            <option>Research Proposal</option>
            <option>Grant Application</option>
            <option>Scholarship Application</option>
            <option>Fellowship Proposal</option>
            <option>Startup Funding Proposal</option>
            <option>Partnership Proposal</option>
          </select>
          {errors.submissionType && <p className="text-red-500 text-sm mt-1">{errors.submissionType}</p>}
        </div>

        {/* Agency */}
        <div>
          <label className="block mb-2 font-medium">Select Agency</label>
          <select name="agency" value={formData.agency} onChange={handleChange} className="w-full border rounded-lg p-3">
            <option value="">Select Agency</option>
            {agencies.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        </div>

        {/* Grant */}
        <div>
          <label className="block mb-2 font-medium">Select Grant</label>
          <select name="grant" value={formData.grant} onChange={handleChange} className="w-full border rounded-lg p-3">
            <option value="">Select Grant</option>
            {grants.map((g) => (
              <option key={g._id} value={g._id}>{g.title}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            placeholder="Proposal Title" className="w-full border rounded-lg p-3" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Funding */}
        <input type="text" name="funding" value={formData.funding} onChange={handleChange}
          placeholder="Requested Funding" className="w-full border rounded-lg p-3" />

        {/* Description */}
        <div>
          <textarea rows={5} name="description" value={formData.description} onChange={handleChange}
            placeholder="Describe your proposal..." className="w-full border rounded-lg p-3" />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* File Upload */}
        <div>
          <input type="file" accept=".pdf,.doc,.docx"
            onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg p-3" />
          {proposalFile && <p className="text-sm text-green-600 mt-1">Selected: {proposalFile.name}</p>}
          {errors.proposalFile && <p className="text-red-500 text-sm mt-1">{errors.proposalFile}</p>}
        </div>

        {/* Applicant Info */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Applicant Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                placeholder="Full Name" className="w-full border rounded-lg p-3" />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="Email" className="w-full border rounded-lg p-3" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                placeholder="Phone Number" className="w-full border rounded-lg p-3" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input type="text" name="cnic" value={formData.cnic} onChange={handleChange}
                placeholder="CNIC No (42101-1234567-1)" className="w-full border rounded-lg p-3" />
              {errors.cnic && <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>}
            </div>
            <div>
              <input type="text" name="country" value={formData.country} onChange={handleChange}
                placeholder="Country" className="w-full border rounded-lg p-3" />
            </div>
            <div>
              <input type="text" name="website" value={formData.website} onChange={handleChange}
                placeholder="Website / LinkedIn" className="w-full border rounded-lg p-3" />
            </div>
            <div className="md:col-span-2">
              <input type="text" name="organization" value={formData.organization} onChange={handleChange}
                placeholder="Institution / Organization" className="w-full border rounded-lg p-3" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-white disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
}