export const enDictionary = {
  seo: {
    title: 'CLOZR | Revenue Operating System for D2C Brands',
    description:
      'CLOZR is the Revenue Operating System for ambitious D2C brands. Reconcile ad platform data with real bank deposits, uncover attribution errors, and scale with financial clarity.',
  },
  header: {
    logoAlt: 'CLOZR',
    logoAriaLabel: 'CLOZR home',
    navAriaLabel: 'Main navigation',
    mobileNavAriaLabel: 'Mobile main navigation',
    openMenuAriaLabel: 'Open menu',
    closeMenuAriaLabel: 'Close menu',
    closeOverlayAriaLabel: 'Close mobile menu overlay',
    navItems: {
      product: 'Product',
      revopsConsulting: 'RevOps Consulting',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    cta: {
      getStarted: 'GO CLOZR',
    },
  },
  hero: {
    titleStart: 'When revenue is real,',
    rotatingPhrases: [
      'profitability works',
      'scaling becomes predictable',
      'ROAS stops lying',
      'growth is guaranteed',
    ],
    descriptionLine1: 'The Revenue Operating System for ambitious D2C brands.',
    descriptionLine2: 'Reconcile your ad platform data with actual bank deposits in real-time.',
    primaryCta: 'See your real numbers',
    secondaryCta: 'Watch demo',
    backgroundAlt: '',
  },
  attribution: {
    eyebrow: 'THE ATTRIBUTION ILLUSION',
    titleLine: 'According to market data,',
    titlePrefix: 'you are',
    titleHighlight: 'losing up to 30%',
    titleSuffix: 'of your margins',
    paragraphs: [
      'Ad platforms claim conversions. Your bank account tells a different story.',
      'Between iOS updates, attribution overlaps, refunds, and failed payments, relying on Meta or Google dashboards is burning your flow.',
    ],
    chart: {
      ariaLabel: 'Revenue attribution comparison chart',
      badge: '30%',
      labels: {
        claimedLine1: 'Platform Claimed',
        claimedLine2: 'Revenue',
        bankLine1: 'Actual Bank',
        bankLine2: 'Deposit',
      },
    },
  },
  solution: {
    eyebrow: 'THE SOLUTION',
    titleLine1: 'Total financial clarity.',
    titleLine2: 'Zero manual spreadsheets.',
    cards: {
      reconciliation: {
        titleLine1: 'Real-Time',
        titleLine2: 'Reconciliation.',
        description: 'Stripe + Ad Platforms synced instantly.',
      },
      trueCacRoas: {
        titleLine1: 'True CAC',
        titleLine2: '& ROAS.',
        description: 'See what it actually costs to acquire a paying customer, post-refunds.',
      },
      hiddenLeak: {
        titleLine1: 'Hidden Leak',
        titleLine2: 'Detection.',
        description: 'Spot failed payments and chargebacks before they scale.',
      },
    },
  },
  advisory: {
    eyebrow: 'CLOZR ADVISORY',
    titleLine1: 'Software built for operators.',
    titleLine2: 'Implemented by Growth Partners.',
    body: 'Need more than just data? Our in-house RevOps team acts as your strategic partner. We audit your infrastructure, implement the CLOZR system, and build bespoke growth systems to scale your operations.',
    ctaLabel: 'Apply for Partnership',
    ctaSupport: 'Application-only for high-ticket D2C operators.',
  },
  socialProof: {
    eyebrow: 'SOCIAL PROOF & DATA',
    headline: 'Built on verified financial models.',
    subcopy:
      'Every dashboard view is grounded in reconciled cash, refund-aware logic, and auditable attribution rules.',
    integrationsTitle: 'ACTIVE INTEGRATIONS',
    integrations: {
      stripe: 'Stripe',
      meta: 'Meta',
      google: 'Google',
    },
    certificationsTitle: 'MODEL CONTROLS',
    certifications: [
      'Bank-deposit reconciliation layer',
      'Post-refund CAC and ROAS normalization',
      'Cross-platform attribution overlap checks',
    ],
    testimonial:
      'Since deploying CLOZR, we uncovered EUR 40k in hidden attribution errors within 30 days.',
    testimonialAuthor: '[Founder Name], D2C Brand',
  },
  pricing: {
    eyebrow: 'PRICING',
    support: 'SaaS + Consulting',
    headline: 'Choose the operating layer for your next stage of growth.',
    popularBadge: 'Popular',
    plans: {
      starter: {
        name: 'Starter',
        price: 'EUR 225/mo',
        subtitle: 'For emerging brands.',
        description: 'Core CLOZR SaaS stack to align ad data with real bank outcomes.',
        features: [
          'Real-time reconciliation dashboard',
          'Revenue and margin visibility by channel',
          'Refund-aware CAC and ROAS tracking',
          'Monthly model health checks',
        ],
        cta: 'Start with Starter',
      },
      professional: {
        name: 'Professional',
        price: 'EUR 450/mo',
        subtitle: 'For scaling operations.',
        description: 'Advanced analytics and deeper controls for multi-channel growth teams.',
        features: [
          'Everything in Starter',
          'Attribution overlap diagnostics',
          'Automated anomaly and leak alerts',
          'Priority support and strategy reviews',
        ],
        cta: 'Choose Professional',
      },
      growthPartner: {
        name: 'Growth Partner',
        price: 'Custom Pricing',
        subtitle: 'For ambitious brands ready to dominate.',
        description: 'Enterprise SaaS access with RevOps consulting and a dedicated growth team.',
        features: [
          'Enterprise CLOZR configuration',
          'RevOps consulting and implementation',
          'Dedicated strategic partner team',
          'Bespoke growth system design',
        ],
        cta: 'Talk to a Partner',
      },
    },
  },
  contact: {
    eyebrow: 'CONTACT',
    support: 'Start the conversation',
    headline: 'Tell us where growth is leaking.',
    description:
      'Share your current setup and goals. We will review your revenue infrastructure and propose the next operating plan.',
    ctaLabel: 'Send Inquiry',
    sendingLabel: 'Sending...',
    successMessage: 'Message sent successfully. We will get back to you soon.',
    errorMessage: 'Could not send message right now. Please try again.',
    sideTitle: 'What happens next',
    sidePoints: [
      'Initial assessment of your current data stack',
      'Priority diagnosis for attribution and cash gaps',
      'Recommended path: SaaS, RevOps advisory, or hybrid',
    ],
    replyTime: 'Response time: usually within 1 business day.',
    form: {
      fullName: 'Full Name',
      workEmail: 'Work Email',
      company: 'Brand / Company',
      monthlyRevenue: 'Monthly Revenue',
      monthlyRevenuePlaceholder: 'Select range',
      monthlyRevenueOptions: ['0 - 50k', '50k - 200k', '200k - 500k', '500k+'],
      message: 'How can we help?',
      hints: {
        fullName: 'Required. Maximum 80 characters.',
        workEmail: 'Required. Use a valid email address.',
        company: 'Optional. Maximum 120 characters.',
        message: 'Required. Between 10 and 1200 characters.',
      },
      validation: {
        nameRequired: 'Please enter your full name.',
        nameTooLong: 'Full name must be 80 characters or fewer.',
        emailRequired: 'Please enter your work email.',
        emailInvalid: 'Please enter a valid email address.',
        emailTooLong: 'Email must be 160 characters or fewer.',
        companyTooLong: 'Company name must be 120 characters or fewer.',
        messageRequired: 'Please tell us how we can help.',
        messageTooShort: 'Message must be at least 10 characters.',
        messageTooLong: 'Message must be 1200 characters or fewer.',
      },
    },
  },
  footer: {
    logoAlt: 'CLOZR',
    columns: {
      product: {
        title: 'Product',
        links: {
          home: 'Home',
          product: 'Product',
          pricing: 'Pricing',
        },
      },
      resources: {
        title: 'Resources',
        links: {
          revopsConsulting: 'RevOps Consulting',
          contact: 'Contact',
        },
      },
    },
    legal: {
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms',
    },
    location: 'Madrid, Spain. Built for global brands.',
    social: {
      linkedIn: 'LinkedIn',
      x: 'X',
      instagram: 'Instagram',
      email: 'Email',
    },
  },
  legalPages: {
    shared: {
      backToHome: 'Back to home',
      contactLabel: 'Contact',
      contactEmail: 'hello@clozr.com',
      noteTitle: 'Important',
      noteBody:
        'This legal copy should be reviewed by qualified counsel before production use, especially if your entity details, jurisdictions, or data flows change.',
    },
    terms: {
      title: 'Terms and Conditions',
      seoTitle: 'CLOZR | Terms and Conditions',
      seoDescription:
        'Read the Terms and Conditions governing access to the CLOZR website, services, subscriptions, and acceptable use.',
      eyebrow: 'LEGAL',
      lastUpdatedLabel: 'Last updated',
      lastUpdatedValue: 'March 14, 2026',
      intro:
        'These Terms and Conditions govern access to and use of the CLOZR website, related communications, and any software, consulting, or advisory services made available by CLOZR.',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          paragraphs: [
            'By accessing this website or using any CLOZR service, you agree to be bound by these Terms and all applicable laws and regulations.',
            'If you do not agree with these Terms, you must not access or use the website or services.',
          ],
        },
        {
          heading: '2. Services',
          paragraphs: [
            'CLOZR provides revenue operations software, advisory services, implementation support, and related business analytics tools for ecommerce and consumer brands.',
            'Specific commercial terms, subscription scope, deliverables, support levels, and payment obligations may be defined in a separate order form, statement of work, or master services agreement.',
          ],
        },
        {
          heading: '3. Eligibility and Account Responsibility',
          paragraphs: [
            'You represent that you have authority to act on behalf of your business and to bind it contractually.',
            'You are responsible for maintaining the confidentiality of any credentials used to access CLOZR systems and for all activity carried out under your account.',
          ],
        },
        {
          heading: '4. Acceptable Use',
          paragraphs: [
            'You may not use the website or services to violate any law, infringe third-party rights, interfere with system integrity, introduce malicious code, or attempt unauthorized access to any account, infrastructure, or data.',
            'You must only submit information that you are authorized to process and share with CLOZR.',
          ],
        },
        {
          heading: '5. Client Data and Inputs',
          paragraphs: [
            'You retain responsibility for the legality, accuracy, and integrity of the operational, financial, advertising, and customer data you provide to CLOZR.',
            'You grant CLOZR the limited rights necessary to process such data for the purpose of delivering the agreed services, maintaining the platform, and providing support.',
          ],
        },
        {
          heading: '6. Fees and Payment',
          paragraphs: [
            'Paid plans, consulting engagements, and enterprise services are subject to the pricing or commercial terms agreed between the parties.',
            'Unless otherwise stated in writing, fees are non-refundable once the relevant subscription period or service period has started.',
          ],
        },
        {
          heading: '7. Intellectual Property',
          paragraphs: [
            'CLOZR and its licensors retain all rights, title, and interest in the website, platform, software, models, dashboards, visual materials, documentation, and related intellectual property.',
            'Except where expressly agreed in writing, no ownership rights are transferred to you by virtue of accessing the website or using the services.',
          ],
        },
        {
          heading: '8. Confidentiality',
          paragraphs: [
            'Each party must protect confidential information disclosed by the other using reasonable technical and organizational safeguards.',
            'Confidential information may only be used for the purposes of performing the relevant commercial relationship, unless disclosure is required by law.',
          ],
        },
        {
          heading: '9. Third-Party Services',
          paragraphs: [
            'CLOZR may integrate with or rely on third-party providers such as payment processors, advertising platforms, hosting providers, analytics infrastructure, and communication tools.',
            'CLOZR is not responsible for outages, policy changes, or service limitations caused by third-party platforms outside its reasonable control.',
          ],
        },
        {
          heading: '10. Disclaimers',
          paragraphs: [
            'The website and services are provided on an as-available and as-provided basis, except to the extent otherwise stated in a signed agreement.',
            'CLOZR does not warrant that the website will be uninterrupted, error-free, or suitable for every commercial use case.',
          ],
        },
        {
          heading: '11. Limitation of Liability',
          paragraphs: [
            'To the maximum extent permitted by law, CLOZR will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, goodwill, or business opportunity.',
            'Any direct liability of CLOZR arising out of or connected to the services will be limited to the amount paid by the client for the relevant services during the twelve months preceding the event giving rise to the claim, unless otherwise required by law or agreed in writing.',
          ],
        },
        {
          heading: '12. Termination',
          paragraphs: [
            'CLOZR may suspend or terminate access if you materially breach these Terms, misuse the services, or create a security, compliance, or legal risk.',
            'Termination does not affect accrued rights, outstanding payment obligations, or any clauses intended to survive termination.',
          ],
        },
        {
          heading: '13. Governing Law',
          paragraphs: [
            'Unless otherwise agreed in writing, these Terms are governed by the laws applicable in the jurisdiction where CLOZR is established, excluding conflict-of-law provisions.',
            'The competent courts of that jurisdiction will have exclusive authority to resolve disputes, subject to any mandatory consumer or data protection rights that may apply.',
          ],
        },
        {
          heading: '14. Contact',
          paragraphs: [
            'For legal notices, contractual questions, or requests related to these Terms, contact CLOZR at hello@clozr.com.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      seoTitle: 'CLOZR | Privacy Policy',
      seoDescription:
        'Read the CLOZR Privacy Policy to understand what data is collected, how it is used, and what rights apply to website visitors and leads.',
      eyebrow: 'LEGAL',
      lastUpdatedLabel: 'Last updated',
      lastUpdatedValue: 'March 14, 2026',
      intro:
        'This Privacy Policy explains how CLOZR collects, uses, stores, and protects personal data in connection with the CLOZR website, contact forms, and related communications.',
      sections: [
        {
          heading: '1. Data Controller',
          paragraphs: [
            'CLOZR acts as the controller of personal data collected through this website for lead management, business communications, and website operations.',
            'For privacy-related requests, you can contact hello@clozr.com.',
          ],
        },
        {
          heading: '2. Data We Collect',
          paragraphs: [
            'We may collect contact and business information that you voluntarily provide through the website, including your name, work email, company name, revenue range, and any message you submit through the contact form.',
            'We may also process limited technical information required for security, system integrity, and delivery of the website and its server-side functions.',
          ],
        },
        {
          heading: '3. How We Use Personal Data',
          paragraphs: [
            'We use personal data to respond to inbound requests, evaluate commercial fit, provide information about our products or services, manage prospective client relationships, and operate the website securely.',
            'We do not use your contact form data for unrelated purposes without an appropriate legal basis.',
          ],
        },
        {
          heading: '4. Legal Bases',
          paragraphs: [
            'Depending on the context, CLOZR processes personal data on the basis of pre-contractual measures requested by the data subject, legitimate interest in operating and securing the website, compliance with legal obligations, and, where applicable, consent.',
          ],
        },
        {
          heading: '5. Service Providers',
          paragraphs: [
            'We may share data with trusted service providers that support website hosting, infrastructure, communications, or form delivery, strictly to the extent necessary to provide the relevant service.',
            'At present, contact form submissions may be transmitted through providers such as Resend for email delivery.',
          ],
        },
        {
          heading: '6. International Transfers',
          paragraphs: [
            'Where data is processed outside your country or the European Economic Area, CLOZR will seek to use appropriate safeguards required by applicable data protection law, such as contractual commitments or providers offering adequate protections.',
          ],
        },
        {
          heading: '7. Retention',
          paragraphs: [
            'We retain personal data only for as long as reasonably necessary for the purposes described in this Policy, including follow-up communications, legal compliance, dispute resolution, and record keeping.',
            'Retention periods may vary depending on the relationship, legal obligations, and operational necessity.',
          ],
        },
        {
          heading: '8. Your Rights',
          paragraphs: [
            'Subject to applicable law, you may have rights of access, rectification, erasure, restriction, objection, portability, and the right to withdraw consent where processing is based on consent.',
            'You may also have the right to lodge a complaint with the competent supervisory authority. For users in Spain, this may include the AEPD.',
          ],
        },
        {
          heading: '9. Security',
          paragraphs: [
            'CLOZR applies reasonable technical and organizational measures designed to protect personal data against unauthorized access, disclosure, alteration, or destruction.',
            'No internet transmission or storage system can be guaranteed as completely secure, and you provide data at your own risk within that context.',
          ],
        },
        {
          heading: '10. Cookies and Tracking',
          paragraphs: [
            'This website should disclose any cookies, analytics tools, or tracking technologies that are active in production. If such tools are added or changed, this Policy should be updated accordingly.',
            'If you implement analytics, advertising pixels, or consent tooling, you should complete this section before going live.',
          ],
        },
        {
          heading: '11. Third-Party Links',
          paragraphs: [
            'The website may contain links to third-party sites or services. CLOZR is not responsible for the privacy practices or content of external services not controlled by CLOZR.',
          ],
        },
        {
          heading: '12. Policy Updates',
          paragraphs: [
            'We may update this Privacy Policy from time to time. Material changes should be reflected by updating the last updated date and, where appropriate, by providing additional notice.',
          ],
        },
      ],
    },
  },
} as const

export default enDictionary
