"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProposalForm() {
  
  const [proposalFile, setProposalFile] =
    useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    if (!validateForm()) {
      toast.error(
        "Please complete all required fields and upload the proposal document."
      );
      return;
    }
  
    setLoading(true);  
  
    try {
    const form = new FormData();

    Object.entries(formData).forEach(
    ([key, value]) => {
    form.append(key, value);
    }
    );
    
    if (proposalFile) {
    form.append(
    "proposalFile",
    proposalFile
    );
    }
    
    const res = await fetch(
    "/api/proposals",
    {
    method: "POST",
    body: form,
    }
    );
           
        const data = await res.json();
        setSuccess(true);
        toast.success(data.message);
        
        // form reset
        setFormData({
        role: "",
        submissionType: "",
        // file;""
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
        "Submission failed."
      );
    }
    finally {
        setLoading(false);
      }
  };

  const [formData, setFormData] = useState({
    role: "",
    submissionType: "",
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.role)
      newErrors.role = "Role is required.";
    
    if (!formData.submissionType)
      newErrors.submissionType =
        "Submission type is required.";
  
    if (!formData.title.trim())
      newErrors.title =
        "Proposal title is required.";
  
    if (!formData.description.trim())
      newErrors.description =
        "Description is required.";
  
    if (!formData.fullName.trim())
      newErrors.fullName =
        "Full name is required.";
  
    if (!formData.email.trim())
      newErrors.email =
        "Email is required.";
  
    if (!formData.phone.trim())
      newErrors.phone =
        "Phone number is required.";
  
    if (!formData.cnic.trim())
      newErrors.cnic =
        "CNIC is required.";
  
    if (!proposalFile)
      newErrors.proposalFile =
        "Proposal document is required.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  
  return (
    <div>
 
      <div className="rounded-xl border p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Submit Proposal
        </h2>

 
          {/* FORM START */}
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
  
          {/* Role */}
          <div>
            <label className="block mb-2 font-medium">
              Select Your Role
            </label>
  
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
            >
                <option value="">Select Role</option>
                <option value="Researcher">Researcher</option>
                <option value="Student">Student</option>
                <option value="Faculty Member">Faculty Member</option>
                <option value="Startup Founder">Startup Founder</option>
                <option value="NGO Representative">NGO Representative</option>
                <option value="Organization">Organization</option>
                </select>
          </div>
  
          {errors.role && (
  <p className="text-red-500 text-sm">
    {errors.role}
  </p>
)}
          {/* Submission Type */}
          <div>
            <label className="block mb-2 font-medium">
              Submission Type
            </label>
  
            <select
                name="submissionType"
                value={formData.submissionType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
            >
                <option value="">Select Type</option>
                <option value="Research Proposal">
                    Research Proposal
                </option>
                <option value="Grant Application">
                    Grant Application
                </option>
                <option value="Scholarship Application">
                    Scholarship Application
                </option>
                <option value="Fellowship Proposal">
                    Fellowship Proposal
                </option>
                <option value="Startup Funding Proposal">
                    Startup Funding Proposal
                </option>
                <option value="Partnership Proposal">
                    Partnership Proposal
                </option>
                </select>
          </div>

          {/* Proposal Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Proposal Title"
            className="w-full border rounded-lg p-3"
        />
        {errors.title && (
            <p className="text-red-500 text-sm mt-1">
                {errors.title}
            </p>
        )}
  
          {/* Funding */}
          <input
            type="text"
            name="funding"
            value={formData.funding}
            onChange={handleChange}
            placeholder="Requested Funding"
            className="w-full border rounded-lg p-3"
            />
  
          {/* Description */}
          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your proposal..."
            className="w-full border rounded-lg p-3"
            />
          {/* Documents */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
                setProposalFile(
                e.target.files?.[0] || null
                )
            }
            className="w-full border rounded-lg p-3"
            />

            {proposalFile && (
            <p className="text-sm text-green-600">
                Selected: {proposalFile.name}
            </p>
            )}
            {errors.proposalFile && (
                <p className="text-red-500 text-sm">
                    {errors.proposalFile}
                </p>
                )}
                
          {/* Applicant */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">
              Applicant Information
            </h3>
  
            <div className="grid md:grid-cols-2 gap-4">
            <div>
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-lg p-3"
                />
                </div>

                <div>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-lg p-3"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {errors.email}
                    </p>
                    )}
                </div>

                <div>
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border rounded-lg p-3"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                  {errors.phone}
                </p>
              )}
              </div>

              <div>
                <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="CNIC No (42101-1234567-1)"
                pattern="[0-9]{5}-[0-9]{7}-[0-9]"
                className="border rounded-lg p-3"
                />
                {errors.cnic && (
                  <p className="text-red-500 text-sm">
                        {errors.cnic}
                    </p>
                    )}
                </div>

                <div>
                <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="border rounded-lg p-3"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                        {errors.country}
                    </p>
                    )}
     </div>
     <div>          
                <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website / LinkedIn"
                className="border rounded-lg p-3"
                />
          </div> 
          <div>      
                <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Institution / Organization"
                className="border rounded-lg p-3 md:col-span-2"
                />
             </div>
            </div>
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white disabled:opacity-50"
            >
            {loading ? "Submitting..." : "Submit Proposal"}
            </button>
        </form>
        
         {/* FORM END */}
      </div>
    </div>
    );
}