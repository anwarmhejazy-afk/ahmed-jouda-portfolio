import {defineField, defineType} from 'sanity'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '+20 11 58530730',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'Ahmed.jouda98@hotmail.com',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/ahmedjoudaa',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'clinicNameAr',
      title: 'Clinic Name - Arabic',
      type: 'string',
    }),
    defineField({
      name: 'clinicNameEn',
      title: 'Clinic Name - English',
      type: 'string',
    }),
    defineField({
      name: 'addressAr',
      title: 'Address - Arabic',
      type: 'text',
      rows: 3,
      initialValue: 'القاهرة، مصر',
    }),
    defineField({
      name: 'addressEn',
      title: 'Address - English',
      type: 'text',
      rows: 3,
      initialValue: 'Cairo, Egypt',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'workingHoursAr',
      title: 'Working Hours - Arabic',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'workingHoursEn',
      title: 'Working Hours - English',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'whatsapp',
    },
  },
})
