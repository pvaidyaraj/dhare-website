"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitSaplingRegistration } from "@/app/actions/sapling";
import { CONSTITUENCIES } from "@/app/data/constituencies";
import Link from "next/link";

const schema = z.object({
  assembly_constituency: z.string().min(1, "Please select your Assembly Constituency"),
  full_name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(10, "Please enter your full address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  saplings_count: z
    .number({ message: "Please enter a number" })
    .int("Enter a whole number")
    .min(51, "Minimum request is more than 50 saplings"),
  not_a_robot: z.literal(true, { message: "Please confirm you are not a robot" }),
});

type FormData = z.infer<typeof schema>;

export default function SaplingRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { not_a_robot: undefined },
  });

  const onSubmit = async ({ not_a_robot: _, ...data }: FormData) => {
    setServerError("");
    const result = await submitSaplingRegistration(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌱</div>
        <h2 className="text-2xl font-bold text-green-800 mb-3">Registration Successful!</h2>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
          Thank you for registering! We will contact you soon with details about collecting your free saplings.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Assembly Constituency */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Assembly Constituency <span className="text-red-500">*</span>
        </label>
        <select
          {...register("assembly_constituency")}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "18px",
          }}
        >
          <option value="">— Select your constituency —</option>
          {CONSTITUENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.assembly_constituency && (
          <p className="text-red-500 text-xs mt-1">{errors.assembly_constituency.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("full_name")}
          placeholder="Your full name"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("address")}
          placeholder="Your full address"
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          {...register("mobile")}
          placeholder="10-digit mobile number"
          maxLength={10}
          inputMode="numeric"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email ID <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          inputMode="email"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Number of Saplings */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Number of Saplings <span className="text-red-500">*</span>
        </label>
        <input
          {...register("saplings_count", { valueAsNumber: true })}
          type="number"
          min={51}
          placeholder="Enter number (minimum 51)"
          inputMode="numeric"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="text-gray-400 text-xs mt-1">Requests of more than 50 saplings only</p>
        {errors.saplings_count && (
          <p className="text-red-500 text-xs mt-0.5">{errors.saplings_count.message}</p>
        )}
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
          {errors.not_a_robot && (
            <p className="mt-1 text-sm text-red-600">{errors.not_a_robot.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl p-3 text-center">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-green-700 hover:bg-green-600 disabled:bg-green-400 text-white font-bold rounded-xl transition-colors text-base shadow-sm"
      >
        {isSubmitting ? "Submitting…" : "Submit Registration"}
      </button>

      <p className="text-center text-xs text-gray-400 pt-1">
        Limited saplings available · For in and around Bengaluru
      </p>
    </form>
  );
}
