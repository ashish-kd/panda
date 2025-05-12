const { PrismaClient } = require('./generated/prisma')
const express = require('express')
const { ListingSchema, ListingArray } = require('./schemas')
const cors = require('cors')

const app = express()

// Add middleware with more specific CORS options
app.use(cors({
  origin: ['https://panda-flax.vercel.app', 'http://localhost:3000'],  // or '*' to allow all origins
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json()) // Parse JSON request bodies

const prisma = new PrismaClient()

// Return JSON data instead of a string
app.get('/api/listing', async (req, res) => {
  try {
    const data = await prisma.listing.findMany({
      select: { id: true, title: true, description: true, rent: true, address: true, rooms: true, contact: true }
    })
    console.log('Listings fetched: ', data)

    const result = ListingArray.safeParse(data)
    if (!result.success) {
      console.error('Response validation failed:', result.error.format())
      return res.status(500).json({ error: 'Server error: invalid data format' })
    }

    res.json(result.data)
  } catch (error) {
    console.error('Error fetching listings:', error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
})

function parseNumericFields(req, res, next) {
  if (req.body) {
    if (req.body.rent) {
      req.body.rent = Number(req.body.rent);
    }

    if (req.body.rooms) {
      req.body.rooms = Number(req.body.rooms);
    }

    if (req.body.contact) {
      req.body.contact = req.body.contact.replace(/\D/g, '');
      if (req.body.contact.length == 11 && req.body.contact.startsWith('1')) {
        req.body.contact = req.body.contact.slice(1);
      }
    }

  }
  next();
}

function validateBody(schema) {
  return (req, res, next) => {
    try {
      schema.safeParse(req.body)
      next()
    } catch (error) {
      console.error('Request Validation error:', error)
      res.status(400).json({ error: error.errors })
    }
  }
}

app.post('/api/listing', parseNumericFields, validateBody(ListingSchema), async (req, res) => {
  try {
    const { title, description, rent, address, rooms, contact } = req.body
    console.log('Request body: ', rent)
    const newListing = await prisma.listing.create({
      data: {
        title: title,
        description: description,
        rent: rent,
        address: address,
        rooms: rooms,
        contact: contact,
      },
    })
    console.log('New listing created: ', newListing)
    res.status(201).json(newListing)
  } catch (error) {
    console.error('Error creating listing:', error)
    res.status(500).json({ error: 'Failed to create listing' })
  }
})

app.delete('/api/listing/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deletedListing = await prisma.listing.delete({
      where: { id: Number(id) },
    })
    console.log('Listing deleted: ', deletedListing)
    res.status(200).json(deletedListing)
  } catch (error) {
    console.error('Error deleting listing:', error)
    res.status(500).json({ error: 'Failed to delete listing' })
  }
})

// For local development
// app.listen(4000, () => {
//   console.log('Example app listening on port 4000!')
// })

// For vercel deployment
module.exports = app