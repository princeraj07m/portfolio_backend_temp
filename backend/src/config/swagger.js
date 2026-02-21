export const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Portfolio Admin API',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:' + (process.env.PORT || 4000) }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/**/*.js', './src/models/**/*.js']
};

