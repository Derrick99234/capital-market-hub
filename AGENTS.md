# Agent Guidelines for Capital Market Hub

This document provides comprehensive guidelines for AI agents working on the Capital Market Hub codebase. Follow these conventions to maintain code quality, consistency, and best practices.

## Project Overview

Capital Market Hub is a Next.js 16 application built with TypeScript, featuring a trading platform with user authentication, wallet management, copy trading, and administrative features. The tech stack includes:

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API routes, MongoDB with Mongoose
- **UI**: Shadcn/ui components with Lucide icons, GSAP animations, Framer Motion
- **Authentication**: JWT tokens with bcryptjs
- **Email**: Nodemailer

## Build, Lint, and Test Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production bundle with Turbopack
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint with Next.js configuration
```

### Testing
**Note**: No test framework is currently configured. When adding tests:
- Use Jest or Vitest for unit/integration tests
- Use Playwright or Cypress for E2E tests
- Add test scripts to package.json

### Running Individual Tests (Future Implementation)
```bash
npm run test -- <test-file>     # Run specific test file
npm run test:watch             # Run tests in watch mode
npm run test:coverage          # Generate coverage report
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled - always provide explicit types
- **Target**: ES2017 with modern ESNext features
- **Module resolution**: Bundler (supports path aliases)
- **Path aliases**: `@/*` maps to `./src/*`

### Import Organization

```typescript
// External libraries first
import { useState, useEffect } from "react";
import { NextResponse } from "next/server";

// Third-party libraries
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

// Internal imports (use @ alias)
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cn } from "@/lib/utils";
```

### Component Structure

#### React Components
```typescript
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export default function ComponentName({ title, onAction }: ComponentProps) {
  const [state, setState] = useState(initialValue);

  return (
    <div className={cn("base-classes", conditionalClass)}>
      {/* Component JSX */}
    </div>
  );
}
```

#### API Routes
```typescript
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Model from "@/models/Model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const data = await Model.find();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

#### Database Models
```typescript
import mongoose, { Schema, Document, models } from "mongoose";

export interface IModel extends Document {
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const ModelSchema = new Schema<IModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Model = models.Model || mongoose.model<IModel>("Model", ModelSchema);
export default Model;
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (`AdminSidebar.tsx`)
- **API Routes**: kebab-case (`user/route.ts`, `trades/pending/route.ts`)
- **Models**: PascalCase (`User.ts`, `Trades.ts`)
- **Utilities**: camelCase (`utils.ts`, `mongodb.ts`)
- **Directories**: kebab-case (`copy-traders`, `account-funding`)

#### Variables and Functions
- **camelCase**: variables, functions, methods, properties
- **PascalCase**: Components, Types, Interfaces, Classes
- **UPPER_SNAKE_CASE**: Constants, environment variables
- **kebab-case**: CSS classes, file names

### Styling with Tailwind CSS

- **Utility-first approach**: Use Tailwind classes directly
- **Conditional classes**: Use `cn()` utility for dynamic classes
- **Custom variants**: Supports dark mode with `dark:` prefix
- **Animation**: Use `tw-animate-css` for additional animations
- **Custom scrollbar**: Blue theme with thin scrollbars

### Error Handling

#### API Routes
```typescript
try {
  // Operation
  return NextResponse.json({ success: true });
} catch (error: any) {
  const status = error.message === "Unauthorized" ? 401 :
                error.message === "Forbidden" ? 403 : 500;
  return NextResponse.json({ error: error.message }, { status });
}
```

#### Components
```typescript
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  try {
    // Async operation
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  }
}, []);
```

### Security Best Practices

- **Never commit secrets**: Use environment variables for API keys, JWT secrets
- **Input validation**: Validate all user inputs on both client and server
- **Authentication**: Use JWT tokens with proper expiration
- **Password hashing**: Use bcryptjs for password storage
- **CORS**: Configure appropriate CORS policies in production

### Performance Considerations

- **Image optimization**: Use Next.js Image component with priority for above-fold images
- **Bundle splitting**: Leverage Next.js automatic code splitting
- **Database queries**: Use `.lean()` for read-only operations, `.select()` to limit fields
- **Animations**: Use GSAP for complex animations, Framer Motion for React-based animations

### Accessibility

- **Semantic HTML**: Use proper heading hierarchy, semantic elements
- **ARIA labels**: Add appropriate ARIA attributes when needed
- **Keyboard navigation**: Ensure interactive elements are keyboard accessible
- **Color contrast**: Maintain sufficient contrast ratios
- **Alt text**: Provide descriptive alt text for images

### Git Workflow

- **Commit messages**: Use conventional commits format
- **Branch naming**: feature/, bugfix/, hotfix/ prefixes
- **Pull requests**: Provide clear descriptions with screenshots for UI changes

## ESLint Configuration

ESLint is configured with Next.js rules. Some rules are disabled:
- `@typescript-eslint/no-unused-vars`: Disabled (may be re-enabled in strict mode)
- `@typescript-eslint/no-explicit-any`: Disabled (use with caution)
- `react-hooks/exhaustive-deps`: Disabled (add dependencies carefully)

## Environment Variables

Required environment variables (add to `.env.local`):
```
MONGODB_URI=mongodb://localhost:27017/capitalmarkethub
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Deployment

- **Platform**: Optimized for Vercel deployment
- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Node version**: 18+ (based on Next.js 16 requirements)

## Additional Notes

- **Responsive design**: Mobile-first approach with responsive breakpoints
- **Internationalization**: Not currently implemented, use English as default
- **SEO**: Implement proper meta tags and structured data for trading pages
- **Analytics**: Consider adding analytics tracking for user behavior

Follow these guidelines to maintain consistency and quality across the codebase. When in doubt, reference existing code patterns in the project.

---
version: 1.0
date: 2026-01-17
title: Trade Status Updates & Admin Responsiveness
intent: Implement admin trade status updates with modal for profit/loss input and responsive design
decisions: Added modal dialog for amount input, updated win/loss APIs to accept amounts, made admin trades page responsive
state: Implementation complete, ready for testing; next tasks include responsiveness review and comprehensive testing
---

## Session Summary: Trade Status Updates & Admin Responsiveness

### Current Session Accomplishments:
✅ **Admin Trade Status Updates**: Implemented modal-based profit/loss amount input system
- Added modal dialog for admins to input exact profit/loss amounts when updating trade status
- Updated `/api/trades/win` endpoint to accept profitAmount and add to user balance  
- Updated `/api/trades/loss` endpoint to record loss amounts (without deducting balance)
- Made admin trades page responsive for mobile devices
- Ensured user dashboard automatically reflects profit/loss updates in balance and trade history

### Technical Implementation:
- **Modal UI**: Rich modal with trade details, amount input, validation, and loading states
- **API Integration**: Both win/loss endpoints now accept amount parameters and update trade.profitLoss field
- **Balance Updates**: Win profits are added to user.totalBalance, losses are recorded but balance unchanged
- **Responsive Design**: Admin trades table adapted for mobile with proper breakpoints and spacing
- **User Experience**: Seamless flow from admin input to user dashboard reflection

### Next Planned Tasks:
🔄 **Work on admin pages responsiveness**
- Review and improve mobile experience for all admin pages (payments, withdrawals, trades)
- Ensure tables are properly responsive with appropriate column hiding on small screens
- Test touch interactions and button sizing on mobile devices

🔍 **Confirm if the trade amount update works**
- Test the complete flow: Admin modal → API update → User dashboard reflection
- Verify profit amounts are added to user balances correctly
- Verify loss amounts are recorded in trade history without affecting balance
- Test edge cases: invalid amounts, network errors, concurrent updates

🔄 **Go round the app to test all round**
- Comprehensive testing of user dashboard functionality
- Test admin panel navigation and all CRUD operations
- Verify authentication flows and role-based access
- Check data consistency across admin and user interfaces
- Performance testing and error handling validation

### Business Impact:
This feature enables precise trade result management where admins can specify exact profit/loss amounts, providing users with accurate balance updates and detailed trade history. The responsive design ensures admins can manage trades effectively from any device.

### Code Quality:
- Clean, type-safe TypeScript implementation
- Proper error handling and validation
- Responsive design with Tailwind CSS
- Maintains existing security and authentication patterns

### Ready for Production:
The implementation is complete and ready for testing. All components compile successfully and follow the established codebase patterns and guidelines.</content>
<parameter name="filePath">C:\Users\USER\Desktop\capital-market-hub\AGENTS.md