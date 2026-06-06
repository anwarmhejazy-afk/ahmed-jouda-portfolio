import {defineField, defineType} from 'sanity'

export const clinicalCase = defineType({
  name: 'clinicalCase',
  title: 'Clinical Cases',
  type: 'document',
  fields: [
    defineField({
      name: 'titleAr',
      title: 'Case Title - Arabic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Case Title - English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryAr',
      title: 'Category - Arabic',
      type: 'string',
      options: {
        list: [
          {title: 'علاج جذور', value: 'علاج جذور'},
          {title: 'إعادة علاج جذور', value: 'إعادة علاج جذور'},
          {title: 'تشخيص ألم', value: 'تشخيص ألم'},
          {title: 'حشو وترميم', value: 'حشو وترميم'},
          {title: 'أخرى', value: 'أخرى'},
        ],
      },
    }),
    defineField({
      name: 'categoryEn',
      title: 'Category - English',
      type: 'string',
      options: {
        list: [
          {title: 'Root Canal', value: 'Root Canal'},
          {title: 'Retreatment', value: 'Retreatment'},
          {title: 'Pain Diagnosis', value: 'Pain Diagnosis'},
          {title: 'Restoration', value: 'Restoration'},
          {title: 'Other', value: 'Other'},
        ],
      },
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description - Arabic',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description - English',
      type: 'text',
      rows: 5,
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
      name: 'treatmentStepsAr',
      title: 'Treatment Steps - Arabic',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'treatmentStepsEn',
      title: 'Treatment Steps - English',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'outcomeAr',
      title: 'Outcome - Arabic',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'outcomeEn',
      title: 'Outcome - English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'approvedForWebsite',
      title: 'Approved for Website',
      type: 'boolean',
      initialValue: false,
      description: 'Only publish cases approved by the doctor.',
    }),
    defineField({
      name: 'patientPrivacyChecked',
      title: 'Patient Privacy Checked',
      type: 'boolean',
      initialValue: false,
      description: 'Confirm no patient name, face, phone number, or private identifier appears.',
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
      subtitle: 'categoryEn',
      media: 'xrayImage',
    },
  },
})
