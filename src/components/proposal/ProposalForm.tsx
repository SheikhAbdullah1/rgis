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
      .then((data) => {
        if (data.success) setAgencies(data.agencies);
      });
    fetch("/api/grants")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGrants(data.grants);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Phone: only digits and + allowed, max 15 chars
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+\s\-]/g, "").slice(0, 16);
    setFormData({ ...formData, phone: value });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  // CNIC: auto-format 42101-1234567-1
  const handleCnic = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "").slice(0, 13);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    if (value.length > 13) value = value.slice(0, 13) + "-" + value.slice(13);
    setFormData({ ...formData, cnic: value });
    if (errors.cnic) setErrors({ ...errors, cnic: "" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.role) newErrors.role = "Role is required.";

    if (!formData.submissionType)
      newErrors.submissionType = "Submission type is required.";

    if (!formData.title.trim() || formData.title.trim().length < 10)
      newErrors.title = "Proposal title is required (min 10 characters).";

    if (!formData.description.trim() || formData.description.trim().length < 50)
      newErrors.description = "Description is required (min 50 characters).";

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3)
      newErrors.fullName = "Full name is required (min 3 characters).";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    // Phone: must start with + country code, min 10 digits
    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!formData.phone.startsWith("+"))
      newErrors.phone = "Phone must start with country code (e.g. +92).";
    else if (phoneDigits.length < 10 || phoneDigits.length > 15)
      newErrors.phone = "Phone must be 10-15 digits with country code.";

    // CNIC: format 42101-1234567-1
    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    if (!formData.cnic.trim()) newErrors.cnic = "CNIC is required.";
    else if (!cnicRegex.test(formData.cnic))
      newErrors.cnic = "CNIC format must be: 42101-1234567-1";

    // Organization — required
    if (
      !formData.organization.trim() ||
      formData.organization.trim().length < 3
    )
      newErrors.organization =
        "Institution/Organization is required (min 3 characters).";

    // Country — required
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    // Funding — optional but if filled, validate format
    if (formData.funding && formData.funding.trim().length > 50)
      newErrors.funding = "Funding amount too long (max 50 characters).";

    if (!proposalFile)
      newErrors.proposalFile = "Proposal document is required.";
    else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (file && !allowedTypes.includes(proposalFile.type))
        newErrors.proposalFile = "Only PDF or Word documents are allowed.";
      else if (proposalFile.size > 10 * 1024 * 1024)
        newErrors.proposalFile = "File size must be less than 10MB.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // if (file && file.size > 5 * 1024 * 1024) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Max file size is 5MB",
  //     },
  //     {
  //       status: 400,
  //     },
  //   );
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    // ✅ Login check — API se verify karo
    const authCheck = await fetch("/api/auth/me");
    if (!authCheck.ok) {
      toast.error("Please login to submit your proposal.");
      setTimeout(() => {
        window.location.href = "/login?redirect=/proposal-center";
      }, 1500);
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value),
      );
      if (proposalFile) form.append("proposalFile", proposalFile);

      const res = await fetch("/api/proposals", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed.");

      setFormCompleted(true);
      toast.success(data.message);

      setFormData({
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
      setProposalFile(null);
      setErrors({});
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Submission failed.",
      );
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
          <label className="block mb-2 font-medium">
            Select Your Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Role</option>
            <option>Researcher</option>
            <option>Student</option>
            <option>Faculty Member</option>
            <option>Startup Founder</option>
            <option>NGO Representative</option>
            <option>Organization</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Submission Type */}
        <div>
          <label className="block mb-2 font-medium">
            Submission Type <span className="text-red-500">*</span>
          </label>
          <select
            name="submissionType"
            value={formData.submissionType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Type</option>
            <option>Research Proposal</option>
            <option>Grant Application</option>
            <option>Scholarship Application</option>
            <option>Fellowship Proposal</option>
            <option>Startup Funding Proposal</option>
            <option>Partnership Proposal</option>
          </select>
          {errors.submissionType && (
            <p className="text-red-500 text-sm mt-1">{errors.submissionType}</p>
          )}
        </div>

        {/* Agency */}
        <div>
          <label className="block mb-2 font-medium">Select Agency</label>
          <select
            name="agency"
            value={formData.agency}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Agency (Optional)</option>
            {agencies.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Grant */}
        <div>
          <label className="block mb-2 font-medium">Select Grant</label>
          <select
            name="grant"
            value={formData.grant}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Grant (Optional)</option>
            {grants.map((g) => (
              <option key={g._id} value={g._id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">
            Proposal Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter proposal title (min 10 characters)"
            maxLength={200}
            className="w-full border rounded-lg p-3"
          />
          <p className="text-xs text-gray-400 mt-1">
            {formData.title.length}/200
          </p>
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Funding */}
        <div>
          <label className="block mb-2 font-medium">Requested Funding</label>
          <input
            type="text"
            name="funding"
            value={formData.funding}
            onChange={handleChange}
            placeholder="e.g. PKR 500,000 or $10,000"
            maxLength={50}
            className="w-full border rounded-lg p-3"
          />
          {errors.funding && (
            <p className="text-red-500 text-sm mt-1">{errors.funding}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">
            Proposal Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your proposal in detail (min 50 characters)"
            maxLength={2000}
            className="w-full border rounded-lg p-3"
          />
          <p className="text-xs text-gray-400 mt-1">
            {formData.description.length}/2000
          </p>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2 font-medium">
            Proposal Document <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg p-3"
          />
          <p className="text-xs text-gray-400 mt-1">
            PDF or Word only, max 10MB
          </p>
          {proposalFile && (
            <p className="text-sm text-green-600 mt-1">
              ✓ Selected: {proposalFile.name}
            </p>
          )}
          {errors.proposalFile && (
            <p className="text-red-500 text-sm mt-1">{errors.proposalFile}</p>
          )}
        </div>

        {/* Applicant Info */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Applicant Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                maxLength={100}
                className="w-full border rounded-lg p-3"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                maxLength={100}
                className="w-full border rounded-lg p-3"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone with country code */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhone}
                placeholder="+92 300 1234567"
                className="w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-400 mt-1">
                Include country code (e.g. +92, +1, +44)
              </p>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* CNIC */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                CNIC No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleCnic}
                placeholder="42101-1234567-1"
                className="w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-400 mt-1">
                Format: 42101-1234567-1
              </p>
              {errors.cnic && (
                <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Pakistan"
                maxLength={60}
                className="w-full border rounded-lg p-3"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Website / LinkedIn
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                maxLength={200}
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Organization — full width, required */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Institution / Organization{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. University of Karachi, HEC Pakistan"
                maxLength={200}
                className="w-full border rounded-lg p-3"
              />
              {errors.organization && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.organization}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Required fields note */}
        <p className="text-xs text-gray-500">
          <span className="text-red-500">*</span> Required fields
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
}
