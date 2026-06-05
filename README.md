# TruthLens - Scam Detection & Digital Safety Platform

## Overview

TruthLens is a full stack cybersecurity platform designed to help users identify scams, phishing attempts, fraudulent websites, fake job offers, suspicious messages, and potentially harmful digital content.

The platform performs multimodal trust analysis on user provided inputs and generates a comprehensive **Trust Report** containing risk assessments, threat classifications, evidence based explanations, and actionable safety recommendations.

TruthLens aims to improve digital safety by enabling users to make informed decisions before interacting with potentially malicious online content.

---

## Key Features

### Universal Threat Scanner

Analyze multiple forms of digital content through a unified scanning interface.

Supported inputs:

* Plain text messages
* Website URLs
* Screenshot images
* Social media messages
* Email content
* Job offer communications

The scanner generates:

* Risk Score (0–100)
* Trust Score (0–100)
* Threat Category
* Confidence Score
* Threat Explanation
* Safety Recommendations

---

### Intelligent Trust Report Generation

Every scan produces a detailed Trust Report containing:

#### Threat Classification

Automatically categorizes content into:

* Phishing
* Scam
* Social Engineering
* Suspicious Communication
* Fake Job Offer
* Fraudulent Website
* Potentially Safe Content

#### Evidence Based Analysis

Provides:

* Detected risk indicators
* Suspicious patterns
* Explanation of findings
* Reasoning behind classification

#### Recommended Actions

Generates practical guidance such as:

* Avoid clicking links
* Verify sender identity
* Report suspicious activity
* Block malicious sources
* Perform additional verification

---

### Website Trust Analysis

Analyze suspicious URLs and websites.

Checks include:

* URL structure validation
* Suspicious keyword detection
* Domain trust indicators
* Potential phishing characteristics
* Risk pattern recognition

Generates:

* Website Trust Score
* Threat Category
* Security Assessment Summary

---

### Image & Screenshot Analysis

Upload screenshots containing:

* WhatsApp messages
* Telegram conversations
* SMS messages
* Social media chats
* Email screenshots

The platform extracts relevant information and evaluates the content for indicators of fraud, phishing, or manipulation.

---

### Authentication & User Management

Secure authentication system with:

* User registration
* Login functionality
* Protected routes
* Personalized scan history

---

### Report Management

Users can:

* View previous Trust Reports
* Revisit scan results
* Track historical analyses
* Access detailed threat explanations

---

## User Workflow

1. Create an account or sign in.
2. Submit suspicious content through the Scanner.
3. TruthLens analyzes the provided input.
4. A Trust Report is generated instantly.
5. Reports are stored for future reference.
6. Users review recommendations and take appropriate action.

---

## System Architecture

### Frontend

Built using modern web technologies:

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Recharts

Provides:

* Responsive user interface
* Interactive dashboards
* Real-time report visualization
* Modern SaaS experience

---

### Backend

Powered by:

* Next.js API Routes
* PostgreSQL
* Prisma ORM

Responsibilities:

* Scan processing
* Threat analysis
* Report generation
* Data persistence
* User management

---

## Project Structure

### apps/web

Frontend application and API routes.

Contains:

* Landing page
* Scanner interface
* Authentication pages
* Report pages
* Dashboard functionality

### packages/db

Database layer.

Contains:

* Prisma schema
* Database client
* Migration utilities
* Data access logic

### packages/types

Shared application types and interfaces.

---

## Security & Reliability

TruthLens is designed with resilience in mind.

Features include:

* Input validation
* Error handling
* Graceful fallback mechanisms
* Database-independent report generation
* Type-safe APIs
* Scalable architecture

Even if database services become unavailable, users can continue generating Trust Reports without interruption.

---

## Future Roadmap

Planned enhancements:

* OCR powered screenshot intelligence
* Email phishing detection
* Fake job offer verification
* QR code safety analysis
* Deepfake image detection
* Community threat reporting
* Threat intelligence dashboard
* PDF report exports
* AI powered risk explanation engine

---

## Impact

TruthLens addresses a growing cybersecurity challenge by helping users identify digital threats before they become victims of fraud, phishing, impersonation, or online scams.

The platform combines trust analysis, threat detection, and actionable guidance into a single user-friendly experience, making cybersecurity more accessible to everyday users.
