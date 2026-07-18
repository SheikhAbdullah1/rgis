import { ProposalData } from "./types";

export interface ValidationErrors {
    [key: string]: string;
}

export function validateProposal(
    proposal: ProposalData,
    isEdit = false,
    proposalFile?: File | null
): ValidationErrors {

    const errors: ValidationErrors = {};

    if (!proposal.role)
        errors.role = "Role is required.";

    if (!proposal.submissionType)
        errors.submissionType = "Submission type is required.";

    if (proposal.title.trim().length < 3)
        errors.title = "Title must contain at least 3 characters.";

    if (proposal.description.trim().length < 50)
        errors.description = "Description should contain at least 50 characters.";

    if (proposal.fullName.trim().length < 3)
        errors.fullName = "Full name is required.";

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(proposal.email))
        errors.email = "Invalid email address.";

    const phoneDigits =
        proposal.phone.replace(/[^\d]/g, "");

    if (!proposal.phone.startsWith("+"))
        errors.phone =
            "Phone number must include country code.";

    if (
        phoneDigits.length < 10 ||
        phoneDigits.length > 15
    )
        errors.phone =
            "Phone should contain 10-15 digits.";

    const cnicRegex =
        /^\d{5}-\d{7}-\d$/;

    if (!cnicRegex.test(proposal.cnic))
        errors.cnic =
            "CNIC format should be 42101-1234567-1";

    if (!proposal.country)
        errors.country = "Country is required.";

    if (!proposal.organization)
        errors.organization =
            "Organization is required.";

    if (!isEdit && !proposalFile)
        errors.proposalFile =
            "Proposal document is required.";

    if (proposalFile) {

        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowed.includes(proposalFile.type))
            errors.proposalFile =
                "Only PDF, DOC and DOCX files are allowed.";

        if (
            proposalFile.size >
            10 * 1024 * 1024
        )
            errors.proposalFile =
                "Maximum file size is 10MB.";
    }

    return errors;
}