import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'patientName',
      title: 'Patient Display Name',
      type: 'string',
      description: 'Use first name only or initials. Do not use full private names without permission.',
    }),
    defineField({
      name: 'reviewAr',
      title: 'Review - Arabic',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'reviewEn',
      title: 'Review - English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'approvedForWebsite',
      title: 'Approved for Website',
      type: 'boolean',
      initialValue: false,
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
      title: 'patientName',
      subtitle: 'reviewEn',
    },
  },
})
