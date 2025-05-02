import React from 'react';
import { useForm } from 'react-hook-form';

function UploadListing({ onSubmit }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                        Listing Title
                    </label>
                    <input
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none
                        ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g. Cozy 2-Bed Downtown"
                    />
                    {errors.title && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Describe your listing' })}
                        className={`w-full h-28 px-4 py-2 border rounded-lg focus:outline-none
            ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Tell people what makes this place special…"
                    />
                    {errors.description && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Rent & Rooms */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Rent */}
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="rent">
                            Rent ($/mo)
                        </label>
                        <input
                            type="number"
                            id="rent"
                            {...register('rent', {
                                required: 'Rent is required',
                                min: { value: 0, message: 'Must be ≥ 0' },
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none
              ${errors.rent ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="1200"
                        />
                        {errors.rent && (
                            <p className="mt-1 text-xs text-red-500">{errors.rent.message}</p>
                        )}
                    </div>

                    {/* Number of Rooms */}
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="rooms">
                            # of Rooms
                        </label>
                        <input
                            type="number"
                            id="rooms"
                            {...register('rooms', {
                                required: 'Number of rooms is required',
                                min: { value: 1, message: 'At least 1 room' },
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none
              ${errors.rooms ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="2"
                        />
                        {errors.rooms && (
                            <p className="mt-1 text-xs text-red-500">{errors.rooms.message}</p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">
                        Address
                    </label>
                    <input
                        id="address"
                        {...register('address', { required: 'Address is required' })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none
            ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="123 Main St, Apt 4B"
                    />
                    {errors.address && (
                        <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
                    )}
                </div>

                {/* Contact Info */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="contact">
                        Contact Info
                    </label>
                    <input
                        id="contact"
                        {...register('contact', {
                            required: 'Contact info is required',
                            validate: (value) => {
                                const digits = value.replace(/\D/g, '');
                                if (digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))) {
                                    return true;
                                }
                                    return 'Must be a valid email or phone number';
                            }
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none
            ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="(123) 456-7890 or 755-123-4567"
                    />
                    {errors.contact && (
                        <p className="mt-1 text-xs text-red-500">{errors.contact.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    {isSubmitting ? 'Uploading...' : 'Upload Listing'}
                </button>
            </form>

        </div>
    );
}

export default UploadListing;