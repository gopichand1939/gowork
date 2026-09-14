'use client';
import {useState} from 'react';
import {projects} from '@/lib/projects';
import {ProjectCard} from './project-card';
export function WorkFilter(){const [filter,setFilter]=useState('all');const visible=projects.filter(x=>filter==='all'||x.kind===filter);return <><div className="work-filter" aria-label="Filter selected work">{[['all','All work'],['systems','Business systems'],['websites','Websites & experiences']].map(([id,label])=><button type="button" key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}<span>{id==='all'?projects.length:projects.filter(x=>x.kind===id).length}</span></button>)}</div><p className="sr-only" role="status">Showing {visible.length} projects</p><div className="project-grid">{visible.map(p=><ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} featured={filter==='all'&&p.slug==='bagel-master'}/>)}</div></>}
