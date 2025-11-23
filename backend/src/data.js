// Mock data for ESSDev Lifeyears application
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load JSON fixtures
let mockUserData, mockRecommendationsData;

try {
  const userJsonPath = join(__dirname, '../data/user.json');
  const recommendationsJsonPath = join(__dirname, '../data/recommendations.json');
  mockUserData = JSON.parse(readFileSync(userJsonPath, 'utf-8'));
  mockRecommendationsData = JSON.parse(readFileSync(recommendationsJsonPath, 'utf-8'));
} catch (error) {
  console.error('Error loading JSON fixtures:', error);
  // Fallback to empty data if files don't exist
  mockUserData = null;
  mockRecommendationsData = [];
}

// Export user data
export const mockUser = mockUserData;

// Export recommendations data from JSON
export const mockRecommendationsFromJson = mockRecommendationsData;
