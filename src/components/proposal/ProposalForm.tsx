"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import BudgetPlanner, { BudgetItem } from "./BudgetPlanner";
import toast from "react-hot-toast";

interface ProposalData {
  _id?: string;
  role: string;
  submissionType: string;
  agency: string;
  grant: string;
  title: string;
  funding: string;
  description: string;
  fullName: string;
  email: string;
  phone: string;
  cnic: string;
  country: string;
  website: string;
  organization: string;
  budgetItems?: BudgetItem[];
}

interface ProposalFormProps {
  proposal?: Partial<ProposalData> & {
    agency?: string | { _id: string; name?: string };
    grant?: string | { _id: string; title?: string };
    budgetItems?: BudgetItem[];
  };
  isEdit?: boolean;
  setFormCompleted?: Dispatch<SetStateAction<boolean>>;
}

interface Agency {
  _id: string;
  name: string;
}

interface Grant {
  _id: string;
  title: string;
}
// The API may return agency/grant either as a raw ObjectId string or as a
// populated object ({ _id, name }). Selects need the raw id either way.
function toId(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "_id" in (value as any)) {
    return (value as any)._id ?? "";
  }
  return "";
}

function blankFormData(
  proposal?: ProposalFormProps["proposal"],
): ProposalData {
  return {
    role: proposal?.role ?? "",
    submissionType: proposal?.submissionType ?? "",
    agency: toId(proposal?.agency),
    grant: toId(proposal?.grant),
    title: proposal?.title ?? "",
    funding: proposal?.funding ?? "",
    description: proposal?.description ?? "",
    fullName: proposal?.fullName ?? "",
    email: proposal?.email ?? "",
    phone: proposal?.phone ?? "",
    cnic: proposal?.cnic ?? "",
    country: proposal?.country ?? "",
    website: proposal?.website ?? "",
    organization: proposal?.organization ?? "",
  };
}

export default function ProposalForm({
  proposal,
  isEdit = false,
  setFormCompleted,
}: ProposalFormProps) {
  const router = useRouter();

  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [grants, setGrants] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProposalData>(
    blankFormData(proposal),
  );

  // Load dropdown data once on mount. Hooks must never be declared inside
  // this callback — only plain async functions.
  useEffect(() => {
    const loadAgencies = async () => {
      try {
        const res = await fetch("/api/agencies");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.success) setAgencies(data.agencies);
      } catch {
        toast.error("Couldn't load agencies list.");
      }
    };

    const loadGrants = async () => {
      try {
        const res = await fetch("/api/grants");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.success) setGrants(data.grants);
      } catch {
        toast.error("Couldn't load grants list.");
      }
    };

    loadAgencies();
    loadGrants();
  }, []);

  // Sync form fields AND budget items whenever the proposal prop
  // becomes available or changes (e.g. it loads asynchronously in edit mode).
  useEffect(() => {
    if (!proposal) return;
    setFormData(blankFormData(proposal));
    setBudgetItems(proposal.budgetItems ?? []);
  }, [proposal]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Phone: only digits, +, spaces, dashes allowed, max 16 chars
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

    if (!formData.title.trim() || formData.title.trim().length < 3)
      newErrors.title = "Proposal title is required (min 3 characters).";

    if (!formData.description.trim() || formData.description.trim().length < 50)
      newErrors.description = "Description is required (min 50 characters).";

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3)
      newErrors.fullName = "Full name is required (min 3 characters).";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!formData.phone.startsWith("+"))
      newErrors.phone = "Phone must start with country code (e.g. +92).";
    else if (phoneDigits.length < 10 || phoneDigits.length > 15)
      newErrors.phone = "Phone must be 10-15 digits with country code.";

    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    if (!formData.cnic.trim()) newErrors.cnic = "CNIC is required.";
    else if (!cnicRegex.test(formData.cnic))
      newErrors.cnic = "CNIC format must be: 42101-1234567-1";

    if (
      !formData.organization.trim() ||
      formData.organization.trim().length < 3
    )
      newErrors.organization =
        "Institution/Organization is required (min 3 characters).";

    if (!formData.country.trim()) newErrors.country = "Country is required.";

    // if (formData.funding && formData.funding.trim().length > 50)
    //   newErrors.funding = "Funding Amount too long (max 50 characters).";

    if (
      formData.funding &&
      formData.funding.trim() &&
      formData.funding.length > 50
    ) {
      newErrors.funding = "Funding amount is too long.";
    }
    // File validation:
    // - Required only on create. Editing without swapping the file is a
    //   valid, common flow, so no file is fine there.
    // - Type/size checks only run when a file was actually selected.
    if (!isEdit && !proposalFile) {
      newErrors.proposalFile = "Proposal document is required.";
    }

    if (proposalFile) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(proposalFile.type)) {
        newErrors.proposalFile = "Only PDF or Word documents are allowed.";
      } else if (proposalFile.size > 10 * 1024 * 1024) {
        newErrors.proposalFile = "File size must be less than 10MB.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value),
      );
      if (proposalFile) form.append("proposalFile", proposalFile);
      // Budget rows are structured data, not a flat field — send as JSON.
      // Confirm the API route parses this key the same way.
      form.append("budgetItems", JSON.stringify(budgetItems));

      const url =
        isEdit && proposal?._id
          ? `/api/proposals/${proposal._id}`
          : "/api/proposals";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, { method, body: form });

      if (res.status === 401) {
        toast.error("Please login to submit your proposal.");
        router.push("/login?redirect=/proposal-center");
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed.");

      toast.success(
        data.message || (isEdit ? "Proposal updated." : "Proposal submitted."),
      );

      if (isEdit) {
        // Keep the entered values on screen — don't clear an edit form —
        // and take the user back to where they can see the change took effect.
        setFormCompleted?.(true);
        router.push("/proposal-center/history");
        router.refresh();
      } else {
        setFormCompleted?.(true);
        setFormData(blankFormData());
        setProposalFile(null);
        setBudgetItems([]);
        setErrors({});
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Submission failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const submitLabel = loading
    ? isEdit
      ? "Updating..."
      : "Submitting..."
    : isEdit
      ? "Update Proposal"
      : "Submit Proposal";

  return (
    <div className="rounded-xl border p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Update Proposal" : "Submit Proposal"}
      </h2>

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
            placeholder="Enter proposal title (min 3 characters)"
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
            Proposal Document{" "}
            {!isEdit && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg p-3"
          />
          <p className="text-xs text-gray-400 mt-1">
            {isEdit
              ? "PDF or Word only, max 10MB. Leave empty to keep the existing file."
              : "PDF or Word only, max 10MB"}
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

        {/* Budget Breakdown */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
          <BudgetPlanner value={budgetItems} onChange={setBudgetItems} />
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
          {submitLabel}
        </button>
      </form>
    </div>
  );
}