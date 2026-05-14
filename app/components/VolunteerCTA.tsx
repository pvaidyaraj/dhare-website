import Image from "next/image";

const volunteerRoles = [
  "Plantation drives",
  "Sapling care & watering",
  "Site monitoring",
  "Biodiversity documentation",
  "Photography & video",
  "School & college awareness",
  "Donor coordination",
  "Tank rejuvenation activities",
  "Community outreach",
];

export default function VolunteerCTA() {
  return (
    <section id="volunteer" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-green-800 rounded-3xl overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/dense-forest.jpeg"
              alt="Volunteer background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-16 items-center">
            {/* Text */}
            <div>
              <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-3">Join Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Become a Green Volunteer
              </h2>
              <p className="text-green-100 leading-relaxed mb-6">
                Dhare Foundation welcomes citizens, students, professionals, families, resident welfare associations,
                companies, schools, colleges, and community groups to participate in plantation and ecological restoration activities.
              </p>
              <a
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-colors text-sm"
              >
                Register as Volunteer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Volunteer roles */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <p className="text-green-300 text-sm font-semibold uppercase tracking-wide mb-4">Volunteers Can Help With</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {volunteerRoles.map((role) => (
                  <div key={role} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                    <span className="text-white text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
