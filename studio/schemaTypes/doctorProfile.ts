import {defineField, defineType} from 'sanity'

export const doctorProfile = defineType({
  name: 'doctorProfile',
  title: 'Doctor Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'fullNameAr',
      title: 'Full Name - Arabic',
      type: 'string',
      initialValue: 'د. أحمد ماهر جودة',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullNameEn',
      title: 'Full Name - English',
      type: 'string',
      initialValue: 'Dr. Ahmed Maher Jouda',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'Professional Title - Arabic',
      type: 'string',
      initialValue: 'طبيب أسنان | علاج الجذور',
    }),
    defineField({
      name: 'titleEn',
      title: 'Professional Title - English',
      type: 'string',
      initialValue: 'Dentist | Endodontics',
    }),
    defineField({
      name: 'shortBioAr',
      title: 'Short Bio - Arabic',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'shortBioEn',
      title: 'Short Bio - English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'fullBioAr',
      title: 'Full Bio - Arabic',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'fullBioEn',
      title: 'Full Bio - English',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'cityAr',
      title: 'City - Arabic',
      type: 'string',
      initialValue: 'القاهرة، مصر',
    }),
    defineField({
      name: 'cityEn',
      title: 'City - English',
      type: 'string',
      initialValue: 'Cairo, Egypt',
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
    }),
    defineField({
      name: 'educationAr',
      title: 'Education - Arabic',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'educationEn',
      title: 'Education - English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'doctorPhoto',
      title: 'Doctor Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'fullNameEn',
      subtitle: 'titleEn',
      media: 'doctorPhoto',
    },
  },
})
