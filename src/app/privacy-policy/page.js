import React from 'react'
import { siteConfig } from '@/lib/config/site'

const page = () => {
  return (
    <main className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        
        <h1 className="text-3xl font-bold text-black sm:text-4xl mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-8">
          At <strong>{siteConfig.businessName}</strong>, we value your privacy. This policy explains how we collect and use your information.
        </p>

        <div className="space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Information We Collect</h2>
            <p>
              We may collect your name, phone number, email address, and project details when you contact us via forms, WhatsApp, or calls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your enquiries</li>
              <li>To provide quotations and services</li>
              <li>To improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Data Sharing</h2>
            <p>
              We do not sell or share your personal information with third parties, except when required for service delivery or legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Third-Party Services</h2>
            <p>
              We may use services like WhatsApp or analytics tools which may collect limited data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-2">Security</h2>
            <p>
              We take reasonable steps to protect your data.
            </p>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-black mb-2">Contact Us</h2>
            <p>
              {siteConfig.businessName}<br />
              Owner: {siteConfig.owner}<br />
              Phone: {siteConfig.phone}<br />
              Email: {siteConfig.email}<br />
              Address: {siteConfig.location}
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}

export default page