import {defineField, defineType} from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificates',
  type: 'document',
  fields: [
    defineField({
      name: 'titleAr',
      title: 'Certificate Title - Arabic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Certificate Title - English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuerAr',
      title: 'Issuer - Arabic',
      type: 'string',
    }),
    defineField({
      name: 'issuerEn',
      title: 'Issuer - English',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'issuerEn',
      media: 'image',
    },
  },
})
