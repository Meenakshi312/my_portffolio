"use client"

export default function CompanyMarquee() {
  const companies = ["Microsoft", "Google", "Amazon", "Meta", "Apple", "Netflix", "Spotify", "Tesla"]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
          Places I have worked in the past
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="mx-8 text-2xl font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
