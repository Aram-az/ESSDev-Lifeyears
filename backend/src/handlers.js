import { http, HttpResponse } from 'msw';
import { mockUser, mockRecommendationsFromJson } from './data.js';

export const handlers = [
  // Get mock user data
  http.get('/mock-user', () => {
    if (!mockUser) {
      return HttpResponse.json(
        { success: false, error: 'User data not found' },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      success: true,
      data: mockUser
    });
  }),

  // Get mock recommendations data
  http.get('/mock-recommendations', () => {
    return HttpResponse.json({
      success: true,
      data: mockRecommendationsFromJson || [],
      count: (mockRecommendationsFromJson || []).length
    });
  })
];
