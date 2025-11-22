// src/app/types/task.ts
// Tipos existentes mejorados
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate?: Date;
  done: boolean;
  shared?: boolean;
  sharedWith?: string[];
  createdAt: Date;
  completedAt?: Date;
}

export type TaskCategory = 'work' | 'home' | 'study' | 'grocery';
export type TaskPriority = 'low' | 'medium' | 'high';
export type PetType = 'cat' | 'dog' | 'dragon' | 'unicorn';

export interface GameData {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastCompletedDate?: Date;
  currentPet: PetType;
  unlockedPets: PetType[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface ThemeConfig {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accent: string;
  card: string;
}

export interface AppData {
  tasks: Task[];
  gameData: GameData;
  currentTheme: string;
}

export interface SharedList {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: Date;
  sharedUrl?: string;
}

export interface CategoryConfig {
  id: TaskCategory;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { id: 'work', name: 'Trabajo', icon: '💼', color: '#3b82f6' },
  { id: 'home', name: 'Casa', icon: '🏠', color: '#10b981' },
  { id: 'study', name: 'Estudio', icon: '📚', color: '#f59e0b' },
  { id: 'grocery', name: 'Compras', icon: '🛒', color: '#ef4444' }
];

export const XP_PER_PRIORITY = {
  low: 10,
  medium: 20,
  high: 30
};

export const PETS_UNLOCK_LEVELS = {
  cat: 1,
  dog: 3,
  dragon: 10,
  unicorn: 20
};