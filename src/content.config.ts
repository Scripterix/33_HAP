import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const sny = defineCollection({ loader: glob({ base: './sny-iskry', pattern: '**/*.md' }) });
const pomysly = defineCollection({ loader: glob({ base: './automatyzacje-md', pattern: '**/*.md', generateId: ({ entry }) => entry.replace(/\.md$/, '') }) });
const ewaluacje = defineCollection({ loader: glob({ base: './ewaluacje-md', pattern: '**/*.md', generateId: ({ entry }) => entry.replace(/\.md$/, '') }) });
export const collections = { sny, pomysly, ewaluacje };
