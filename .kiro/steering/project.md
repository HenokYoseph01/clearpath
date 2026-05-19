# ClearPath - CBT Wellness App

## Stack
React Native with Expo SDK 55, TypeScript, Expo Router, NativeWind, Zustand, expo-sqlite with Drizzle ORM, react-native-reanimated, Moti, and local-only persistence.

## Conventions
- Components are functional and typed.
- Avoid `any`; model wellness data explicitly.
- NativeWind classes are preferred for layout and color.
- DB access belongs in `modules/db/queries.ts`.
- Zustand stores live in `store/`, one file per domain.
- User-facing copy is warm, non-clinical, gender-neutral, and easy to read.
- Avoid UI copy using "disorder", "diagnosis", or "symptom".
- Tap targets should be at least 52 x 52 pt.

## Safety Rule
Crisis resources must render whenever `distressScore >= 8`. This is not optional and must not be hidden behind dismissal, settings, payment, or network state.
