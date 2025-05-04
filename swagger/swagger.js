// swagger/swagger.js
const swaggerAutogen = require('swagger-autogen')()
const fs = require('fs')
const path = require('path')

/** 
 * 1. Base OpenAPI info 
 * 2. Global Bearer auth 
 */
const doc = {
  info: {
    title: 'My API',
    version: '1.0.0',
    description: '🚀 Auto-generated Swagger documentation'
  },
  host: process.env.HOST || 'localhost:5000',
  schemes: ['http','https'],
  basePath: '/api',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter: **Bearer <token>**'
    }
  },
  security: [{ bearerAuth: [] }],
  tags: []
}

// point at your real src/routes folder
const routesDir = path.join(__dirname, '../src/routes')

// first, look for subfolders as tags
fs.readdirSync(routesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    doc.tags.push({
      name: dirent.name,
      description: `${dirent.name} routes`
    })
  })

// then, for any loose .route.js files, tag by filename
fs.readdirSync(routesDir)
  .filter(f => f.endsWith('.route.js'))
  .forEach(file => {
    const tag = file.replace('.route.js','')
    // avoid dupes if you also have a folder of the same name
    if (!doc.tags.find(t => t.name === tag)) {
      doc.tags.push({
        name: tag,
        description: `${tag} routes`
      })
    }
  })

// output file
const outputFile = path.join(__dirname, 'swagger-output.json')
// your express entrypoint
const endpointsFiles = [ path.join(__dirname, '../app.js') ]

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => console.log('✅ swagger-output.json generated'))
  .catch(err => console.error(err))
