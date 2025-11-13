# Learn Your Ciphers

An interactive educational web application that teaches classical cryptography through hands-on visualization and real-time encryption/decryption demonstrations.

## Key Features

- **Four Classical Ciphers**: Interactive implementations of Caesar, Vigenère, Playfair, and Rail Fence ciphers
- **Real-Time Visualization**: Step-by-step visual demonstrations showing how each cipher transforms text
- **Bidirectional Operations**: Encrypt and decrypt text with immediate feedback
- **Multilingual Support**: Full internationalization with English and Polish translations
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Interactive Learning**: Visual grids, shift displays, and animated step-by-step explanations
- **Comprehensive Glossary**: Searchable glossary of cryptographic terms and concepts

## Architecture & Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized production builds
- **React Router** for client-side routing and navigation
- **Tailwind CSS** with custom design system for consistent styling
- **Radix UI** primitives with shadcn/ui components for accessible UI elements

### Internationalization
- **i18next** with React integration for multi-language support
- **Browser language detection** for automatic locale selection
- **JSON-based translation files** organized by namespace

### State Management
- React Hooks (useState, useEffect, useMemo, useCallback) for component state
- Memoization strategies for performance optimization in visualization components

### Development Tools
- **TypeScript** for static type checking
- **ESLint** for code quality and consistency
- **PostCSS** with Autoprefixer for CSS processing

## Technical Challenges

### 1. Real-Time Step-by-Step Visualization
Implementing interactive visualizations that break down complex encryption algorithms into digestible steps required careful state management and performance optimization. The Vigenère cipher visualization, for example, tracks each character transformation, highlights the corresponding position in the Vigenère square, and provides contextual explanations—all while maintaining smooth user interaction and allowing users to step through the process at their own pace.

### 2. Playfair Cipher Complexity
The Playfair cipher presented unique challenges due to its special rules: combining I and J into a single grid position, handling odd-length plaintext with padding, processing duplicate letter pairs, and implementing three distinct transformation rules (same row, same column, rectangle). The implementation required careful text preprocessing, grid generation algorithms, and step-by-step explanation generation that accurately reflects the cipher's manual encryption process.

## Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ziebamikolaj/learn-your-ciphers.git
   cd learn-your-ciphers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   The optimized production build will be generated in the `dist` directory.

5. **Preview the production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
learn-your-ciphers/
├── public/
│   └── locales/          # Translation files (en, pl)
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...          # Feature-specific components
│   ├── pages/            # Route pages
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── lib/              # Library utilities
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── i18n.ts           # i18next configuration
├── package.json
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Usage

Navigate through the application using the top navigation bar:
- **Home**: Overview and quick access to all ciphers
- **Ciphers**: Dropdown menu with individual cipher implementations
- **Glossary**: Searchable dictionary of cryptographic terms

Each cipher page provides:
- Educational background and historical context
- Interactive encryption/decryption tools
- Visual demonstrations of the algorithm
- Step-by-step explanations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mikołaj Zięba - contact@mikolajzieba.com

Project Link: [https://github.com/ziebamikolaj/learn-your-ciphers](https://github.com/ziebamikolaj/learn-your-ciphers)
