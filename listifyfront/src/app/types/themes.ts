//app/types/themes.ts
import { ThemeConfig } from './task';

export const THEMES: Record<string, ThemeConfig> = {
  classic: {
    name: 'Clásico',
    primary: '#000000',
    secondary: '#6b7280',
    background: '#ffffff',
    foreground: '#000000',
    accent: '#f97316',
    card: '#f9fafb'
  },
  ocean: {
    name: 'Océano',
    primary: '#0284c7',
    secondary: '#06b6d4',
    background: '#f0f9ff',
    foreground: '#0c4a6e',
    accent: '#0ea5e9',
    card: '#e0f2fe'
  },
  forest: {
    name: 'Bosque',
    primary: '#059669',
    secondary: '#10b981',
    background: '#f0fdf4',
    foreground: '#064e3b',
    accent: '#34d399',
    card: '#dcfce7'
  },
  sunset: {
    name: 'Atardecer',
    primary: '#ea580c',
    secondary: '#f97316',
    background: '#fff7ed',
    foreground: '#7c2d12',
    accent: '#fb923c',
    card: '#ffedd5'
  },
  lavender: {
    name: 'Lavanda',
    primary: '#7c3aed',
    secondary: '#a78bfa',
    background: '#faf5ff',
    foreground: '#4c1d95',
    accent: '#8b5cf6',
    card: '#f3e8ff'
  },
  rose: {
    name: 'Rosa',
    primary: '#e11d48',
    secondary: '#f43f5e',
    background: '#fff1f2',
    foreground: '#881337',
    accent: '#fb7185',
    card: '#ffe4e6'
  },
  dark: {
    name: 'Oscuro',
    primary: '#f8fafc',
    secondary: '#94a3b8',
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#f97316',
    card: '#1e293b'
  },
  midnight: {
    name: 'Medianoche',
    primary: '#60a5fa',
    secondary: '#93c5fd',
    background: '#020617',
    foreground: '#e0f2fe',
    accent: '#3b82f6',
    card: '#0c1e35'
  }
};