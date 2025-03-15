interface ICandidateFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    photo: File | null;
    skills: string[];
    resume: File | null;
    bio: string;
  }) => void;
}

export type { ICandidateFormProps };
