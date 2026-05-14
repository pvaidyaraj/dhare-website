"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitVolunteerForm } from "@/app/actions/volunteer";

const schema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number({ message: "Please enter a valid age" })
    .int("Age must be a whole number")
    .min(16, "Must be at least 16 years old")
    .max(100, "Please enter a valid age"),
  city: z.string().min(2, "City is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  other_interests: z.string().max(500, "Maximum 500 characters").optional(),
  availability: z.array(z.string()).min(1, "Select at least one availability slot"),
  motivation: z
    .string()
    .min(20, "Please share a bit more — at least 20 characters")
    .max(1000, "Maximum 1000 characters"),
  not_a_robot: z.literal(true, { message: "Please confirm you are not a robot" }),
});

type FormValues = z.infer<typeof schema>;

const SKILL_OPTIONS = [
  "Plantation & Nursery Work",
  "Photography & Documentation",
  "Teaching & Awareness Programs",
  "Social Media & Content",
  "Event Coordination",
  "Transportation & Logistics",
  "Fundraising",
  "Website & Technology",
  "Community Outreach",
];

const AVAILABILITY_OPTIONS = [
  "Weekday Mornings",
  "Weekday Evenings",
  "Saturday",
  "Sunday",
  "Flexible / Any Time",
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
    hasError
      ? "border-red-400 bg-red-50"
      : "border-gray-200 bg-white hover:border-gray-300"
  }`;
}

export default function VolunteerForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { skills: [], availability: [], not_a_robot: undefined },
  });

  const selectedSkills = watch("skills") ?? [];
  const selectedAvailability = watch("availability") ?? [];
  const motivationValue = watch("motivation") ?? "";
  const otherInterestsValue = watch("other_interests") ?? "";

  function toggleCheckbox(field: "skills" | "availability", value: string) {
    const current = field === "skills" ? selectedSkills : selectedAvailability;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, updated, { shouldValidate: true });
  }

  async function onSubmit(data: FormValues) {
    setServerError(null);
    const result = await submitVolunteerForm(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Received!</h2>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          Thank you for joining Dhare Foundation's green movement. We'll reach out to you soon with details
          about upcoming plantation drives and volunteer activities.
        </p>
        <p className="mt-5 text-green-700 font-semibold italic">Plant. Protect. Recharge. Restore.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Row 1: Full Name + Age */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="full_name" required>Full Name</Label>
          <input
            id="full_name"
            type="text"
            placeholder="e.g. Ravi Kumar"
            {...register("full_name")}
            className={inputClass(!!errors.full_name)}
          />
          <FieldError message={errors.full_name?.message} />
        </div>
        <div>
          <Label htmlFor="age" required>Age</Label>
          <input
            id="age"
            type="number"
            placeholder="e.g. 28"
            min={16}
            max={100}
            {...register("age", { valueAsNumber: true })}
            className={inputClass(!!errors.age)}
          />
          <FieldError message={errors.age?.message} />
        </div>
      </div>

      {/* Row 2: City + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" required>City</Label>
          <input
            id="city"
            type="text"
            placeholder="e.g. Bengaluru"
            {...register("city")}
            className={inputClass(!!errors.city)}
          />
          <FieldError message={errors.city?.message} />
        </div>
        <div>
          <Label htmlFor="phone" required>Phone Number</Label>
          <input
            id="phone"
            type="tel"
            placeholder="10-digit mobile number"
            maxLength={10}
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" required>Email Address</Label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={inputClass(!!errors.email)}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Skills */}
      <div>
        <Label htmlFor="skills" required>Skills & Areas of Interest</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {SKILL_OPTIONS.map((skill) => {
            const checked = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleCheckbox("skills", skill)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all ${
                  checked
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:border-green-400"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    checked ? "border-white bg-white" : "border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                {skill}
              </button>
            );
          })}
        </div>
        <FieldError message={errors.skills?.message} />

        {/* Any other interests */}
        <div className="mt-3">
          <label htmlFor="other_interests" className="block text-sm text-gray-600 mb-1.5">
            Any other interests or skills?
          </label>
          <textarea
            id="other_interests"
            placeholder="e.g. Landscape architecture, legal aid, organic farming…"
            rows={2}
            {...register("other_interests")}
            className={`${inputClass(!!errors.other_interests)} resize-none`}
          />
          <div className="flex justify-between mt-1">
            <FieldError message={errors.other_interests?.message} />
            <span className={`text-xs ml-auto ${otherInterestsValue.length > 450 ? "text-amber-600" : "text-gray-400"}`}>
              {otherInterestsValue.length}/500
            </span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <Label htmlFor="availability" required>Availability</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {AVAILABILITY_OPTIONS.map((slot) => {
            const checked = selectedAvailability.includes(slot);
            return (
              <button
                key={slot}
                type="button"
                onClick={() => toggleCheckbox("availability", slot)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  checked
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:border-green-400"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <FieldError message={errors.availability?.message} />
      </div>

      {/* Motivation */}
      <div>
        <Label htmlFor="motivation" required>Why do you want to volunteer?</Label>
        <textarea
          id="motivation"
          placeholder="Tell us what motivates you to join Dhare Foundation's mission…"
          rows={5}
          {...register("motivation")}
          className={`${inputClass(!!errors.motivation)} resize-none`}
        />
        <div className="flex justify-between mt-1">
          <FieldError message={errors.motivation?.message} />
          <span className={`text-xs ml-auto ${motivationValue.length > 900 ? "text-amber-600" : "text-gray-400"}`}>
            {motivationValue.length}/1000
          </span>
        </div>
      </div>

      {/* Human verification */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${errors.not_a_robot ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
        <input
          id="not_a_robot"
          type="checkbox"
          {...register("not_a_robot")}
          className="mt-0.5 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer shrink-0"
        />
        <div>
          <label htmlFor="not_a_robot" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
            I am not a robot
          </label>
          <p className="text-xs text-gray-500 mt-0.5">Please confirm you are a human before submitting.</p>
          <FieldError message={errors.not_a_robot?.message} />
        </div>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Submitting…
          </>
        ) : (
          "Register as Volunteer"
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Your information is used only for volunteer coordination by Dhare Foundation.
      </p>
    </form>
  );
}
