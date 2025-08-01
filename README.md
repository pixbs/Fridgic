# Fridgic 🥘

Fridgic is a React Native mobile application built with Expo that helps users scan food product barcodes and manage their food inventory. The app leverages the Open Food Facts API to provide detailed product information and allows users to save products for future reference.

## Features

- **Barcode Scanning**: Use your device's camera to scan product barcodes
- **Product Information**: Get detailed product information including:
  - Nutritional information and Nutri-Score grades
  - Ingredients and allergen information
  - Brand, categories, and packaging details
  - Product images
- **Save Products**: Save scanned products to your personal collection
- **Product Management**: View and manage your saved products
- **Cross-Platform**: Runs on iOS, Android, and web

## Technology Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router with file-based routing
- **Camera**: Expo Camera for barcode scanning
- **Storage**: AsyncStorage for local data persistence
- **API**: Open Food Facts API for product data
- **UI**: React Navigation with themed components
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Bun (recommended) or npm
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pixbs/Fridgic.git
   cd Fridgic
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan the QR code with Expo Go app on your device

## Project Structure

```
app/
├── (tabs)/          # Tab-based navigation screens
│   ├── index.tsx    # Home screen
│   └── explore.tsx  # Explore screen
├── (screens)/       # Additional screens
│   ├── index.tsx    # Screen index
│   └── scan.tsx     # Barcode scanning screen
├── product.tsx      # Product details modal
├── saved-product.tsx # Saved product details modal
└── _layout.tsx      # Root layout
components/          # Reusable UI components
constants/           # Type definitions and constants
assets/             # Images, fonts, and other assets
```

## Available Scripts

- `bun start` / `npm start` - Start the Expo development server
- `bun run android` - Start the app on Android
- `bun run ios` - Start the app on iOS
- `bun run web` - Start the app on web
- `bun run lint` - Run Biome linter with auto-fix

## API Integration

Fridgic uses the [Open Food Facts API](https://world.openfoodfacts.org/data) to fetch product information. The API provides comprehensive data about food products worldwide, including nutritional information, ingredients, and images.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Project Link: [https://github.com/pixbs/Fridgic](https://github.com/pixbs/Fridgic)
