const z = require('zod');

const ListingSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    rent: z.number().positive({ message: 'Rent must be a positive number' }),
    address: z.string().min(1, { message: 'Address is required' }),
    rooms: z.number().int().positive({ message: 'Rooms must be a positive integer' }),
    contact: z.string().length(10, { message: 'Contact number must be 10 digits' })
})

const ListingOut = z.object({
    title:       z.string(),
    description: z.string(),
    rent:        z.number().int(),
    address:     z.string(),
    rooms:       z.number().int(),
    contact:     z.string().length(10),
  })

const ListingArray = z.array(ListingOut)

module.exports = { ListingSchema, ListingArray };