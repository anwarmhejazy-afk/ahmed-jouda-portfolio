import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'titleAr',
      title: 'Service Title - Arabic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Service Title - English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description - Arabic',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description - English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'iconLabel',
      title: 'Icon Label',
      type: 'string',
      description: 'Example: Root, Pain, Crown',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'titleAr',
    },
  },
})
