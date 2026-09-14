import type {MetadataRoute} from 'next';
import {site} from '@/lib/site';
import {projects} from '@/lib/projects';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','/work',...projects.map(p=>`/work/${p.slug}`),'/services','/about','/contact','/privacy'].map(path=>({url:`${site.url}${path}/`,changeFrequency:'monthly' as const,priority:path===''?1:path.startsWith('/work/')?.8:.7}))}
