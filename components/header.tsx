'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import {site} from '@/lib/site';
const links=[['Work','/work'],['Services','/services'],['About','/about']];
export function Header(){
 const pathname=usePathname();const [open,setOpen]=useState(false);const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>{setOpen(false)},[pathname]);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape'&&open){setOpen(false);button.current?.focus()}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[open]);
 return <header className="site-header"><div className="container header-inner">
  <Link href="/" className="wordmark" aria-label={`${site.name} home`}>{site.name}<span className="brand-dot">.</span><span className="wordmark-detail">PRODUCT ENGINEERING</span></Link>
  <nav aria-label="Main navigation" className="desktop-nav">{links.map(([label,href])=><Link href={href} key={href} aria-current={pathname.startsWith(href)?'page':undefined}>{label}</Link>)}</nav>
  <Link href="/contact" className="nav-contact">Let’s talk <ArrowUpRight size={16}/></Link>
  <button ref={button} type="button" className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close navigation':'Open navigation'}>{open?<X/>:<Menu/>}</button>
 </div>{open&&<nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...links,['Discuss a project','/contact']].map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></Link>)}</nav>}</header>
}
