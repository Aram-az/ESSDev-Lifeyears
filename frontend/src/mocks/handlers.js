import { http, HttpResponse } from 'msw';
import { mockRecommendations, mockPreventionData, mockLongevityData } from './data';

export const handlers = [
  // Get all recommendations
  http.get('/api/recommendations', () => {
    return HttpResponse.json({
      success: true,
      data: mockRecommendations,
      count: mockRecommendations.length
    });
  }),

  // Get single recommendation by ID
  http.get('/api/recommendations/:id', ({ params }) => {
    const recommendation = mockRecommendations.find(
      (rec) => rec.id === parseInt(params.id)
    );
    
    if (!recommendation) {
      return HttpResponse.json(
        { success: false, error: 'Recommendation not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: recommendation
    });
  }),

  // Get primary prevention data
  http.get('/api/prevention/primary', () => {
    return HttpResponse.json({
      success: true,
      data: mockPreventionData.primary,
      count: mockPreventionData.primary.length
    });
  }),

  // Get secondary prevention data
  http.get('/api/prevention/secondary', () => {
    return HttpResponse.json({
      success: true,
      data: mockPreventionData.secondary,
      count: mockPreventionData.secondary.length
    });
  }),

  // Get all prevention data (both primary and secondary)
  http.get('/api/prevention', () => {
    return HttpResponse.json({
      success: true,
      data: mockPreventionData
    });
  }),

  // Get longevity data
  http.get('/api/longevity', () => {
    return HttpResponse.json({
      success: true,
      data: mockLongevityData
    });
  }),

  // Health check endpoint
  http.get('/api/health', () => {
    return HttpResponse.json({
      success: true,
      message: 'Mock API is running',
      timestamp: new Date().toISOString()
    });
  })
];

