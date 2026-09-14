import type {Metadata,Viewport} from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/inter';
import './globals.css';
import {Header} from '@/components/header';
import {Footer} from '@/components/common';
import {site,description} from '@/lib/site';
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:`${site.name} — Product Engineering & Software Consulting`,template:`%s — ${site.name}`},description,openGraph:{type:'website',locale:'en_GB',siteName:`${site.name} · Product Engineering`,title:'Software built around your business.',description,images:[{url:'/images/og.png',width:1200,height:630,alt:`${site.name} — Product Engineering & Software Consulting`}]},twitter:{card:'summary_large_image',title:`${site.name} · Product Engineering`,description,images:['/images/og.png']},robots:{index:true,follow:true},icons:{icon:'/icon.svg'}};
export const viewport:Viewport={themeColor:'#141614',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:site.fullName,url:site.url,jobTitle:site.role,sameAs:[site.github,site.linkedin],knowsAbout:['Custom business software','Web application development','SaaS development','React','Node.js','PostgreSQL']}).replace(/</g,'\\u003c')}}/></body></html>}
