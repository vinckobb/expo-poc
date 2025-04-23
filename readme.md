# Expo POC Monorepo

This repository is a proof of concept (POC) for a monorepo setup using Expo/Next.js/React Router with Turborepo. It demonstrates how to manage multiple packages or applications within a single repository.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or later) - [Download here](https://nodejs.org/)

## Installation

Follow these steps to set up the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vinckobb/expo-poc.git
   cd expo-poc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the project**:
   ```bash
   npm run dev
   ```
   You can also run on specific mobile device(or emulator) using
   ```bash
   npm run dev:android
   ```
   ```bash
   npm run dev:ios
   ```

## Project Structure

```
expo-poc/
├── apps/
│   ├── mobile/                # React native application for mobile devices
│   ├── web/                   # Next.js version for web
│   └── web-react-router/      # React native application for mobile devices
├── packages/
│   ├── components/            # Shared components
│   ├── theme/                 # App themes
│   └── ...                    # Additional packages
├── node_modules/              # Dependencies
├── turbo.json                 # Turborepo configuration
├── package.json               # Root package configuration
└── package-lock.json          # Dependency lock file
```
