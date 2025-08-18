'use client'

import { Suspense } from 'react'
import ContactUsPage from './ContactPage'

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUsPage />
    </Suspense>
  )
}
