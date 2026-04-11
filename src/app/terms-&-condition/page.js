import React from 'react'
import { siteConfig } from '@/lib/config/site'

const page = () => {
  return (
    <main className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">

        <h1 className="text-3xl font-bold text-black sm:text-4xl mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to <strong>{siteConfig.businessName}</strong>. By using our website, you agree to the following terms.
        </p>

        <div className="space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Services</h2>
            <p>
              We provide aluminium, ACP, glass, and fabrication services as per client requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Quotations</h2>
            <p>
              All quotes provided are based on project details and may vary depending on site conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Payments</h2>
            <p>
              Payment terms will be discussed and agreed upon before starting any project.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Work Timeline</h2>
            <p>
              Project timelines are estimates and may vary due to external factors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Liability</h2>
            <p>
              We are not responsible for delays caused by third parties or unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Changes</h2>
            <p>
              We reserve the right to update these terms at any time.
            </p>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-black mb-2">Contact</h2>
            <p>
              {siteConfig.businessName}<br />
              Phone: {siteConfig.phone}<br />
              Email: {siteConfig.email}
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}

export default page