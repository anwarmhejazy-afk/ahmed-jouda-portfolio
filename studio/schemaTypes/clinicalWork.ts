import {defineField, defineType} from 'sanity'

export const clinicalWork = defineType({
  name: 'clinicalWork',
  title: 'Clinical Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Case Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Root Canal Treatment', value: 'Root Canal Treatment'},
          {title: 'Endodontic Retreatment', value: 'Endodontic Retreatment'},
          {title: 'Dental Pain Diagnosis', value: 'Dental Pain Diagnosis'},
          {title: 'Dental Filling', value: 'Dental Filling'},
          {title: 'Crown / Restoration', value: 'Crown / Restoration'},
          {title: 'Other', value: 'Other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Case Description',
      type: 'text',
      rows: 5,
      description: 'Keep it professional. Do not include patient private details.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'xrayImage',
      title: 'X-Ray Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'extraImages',
      title: 'Extra Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Instagram, YouTube, TikTok, or uploaded video link if available.',
    }),
    defineField({
      name: 'approvedForWebsite',
      title: 'Approved for Website',
      type: 'boolean',
      initialValue: false,
      description: 'Only show this case on the live website after approval.',
    }),
    defineField({
      name: 'privacyChecked',
      title: 'Patient Privacy Checked',
      type: 'boolean',
      initialValue: false,
      description: 'Confirm there is no patient name, face, phone number, or private information.',
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
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
