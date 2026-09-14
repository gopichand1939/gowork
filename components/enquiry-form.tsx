'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Copy,Check,Mail} from 'lucide-react';
import {site} from '@/lib/site';
import {enquiryFields,formatEnquiry,enquiryMailto} from '@/lib/enquiry.mjs';
import {services} from './common';
type Values=Record<string,string>;
const useNetlify=process.env.NEXT_PUBLIC_CONTACT_MODE==='netlify';
export function EnquiryForm(){
 const [state,setState]=useState<'idle'|'review'|'sending'|'sent'|'error'>('idle');const [values,setValues]=useState<Values>({});const [copied,setCopied]=useState(false);const result=useRef<HTMLDivElement>(null);const form=useRef<HTMLFormElement>(null);
 useEffect(()=>{const q=new URLSearchParams(window.location.search);if(q.get('type')){const el=form.current?.elements.namedItem('type') as HTMLSelectElement;if(el&&[...el.options].some(o=>o.value===q.get('type')))el.value=q.get('type')!}if(q.get('project')){const el=form.current?.elements.namedItem('project') as HTMLInputElement;if(el)el.value=`A project similar to ${q.get('project')?.slice(0,80)}`}},[]);
 useEffect(()=>{if(['review','sent','error'].includes(state))result.current?.focus()},[state]);
 async function submit(e:React.SubmitEvent<HTMLFormElement>){e.preventDefault();if(state==='sending')return;const data=new FormData(e.currentTarget);if(data.get('bot-field'))return;const next=Object.fromEntries(enquiryFields.map(key=>[key,String(data.get(key)||'')]));setValues(next);setCopied(false);
  if(!useNetlify){setState('review');return}
  setState('sending');try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);let response:Response;try{response=await fetch('/__forms.html',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({'form-name':'project-enquiry',...next,'bot-field':''}).toString(),signal:controller.signal})}finally{clearTimeout(timer)}if(!response.ok)throw new Error('Delivery failed');setState('sent');form.current?.reset()}catch{setState('error')}
 }
 async function copy(){try{await navigator.clipboard.writeText(formatEnquiry(values));setCopied(true)}catch{const textarea=result.current?.querySelector('textarea');textarea?.focus();textarea?.select()}}
 return <form className="enquiry-form" ref={form} name="project-enquiry" method="POST" action="/__forms.html" onSubmit={submit} data-netlify="true" data-netlify-honeypot="bot-field">
 <input type="hidden" name="form-name" value="project-enquiry"/><div hidden><label>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></div>
 <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name"/></div>
 <div className="field"><label htmlFor="company">Company <span>(optional)</span></label><input id="company" name="company" autoComplete="organization" maxLength={150} placeholder="Company or product"/></div>
 <div className="field full"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@company.com"/></div>
 <div className="field full"><label htmlFor="project">What are you building? *</label><input id="project" name="project" required maxLength={150} placeholder="A short description of your project"/></div>
 <div className="field full"><label htmlFor="type">Project type <span>(optional)</span></label><select id="type" name="type" defaultValue=""><option value="">Select a project type</option>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Something else / Let’s discuss</option></select></div>
 <div className="field"><label htmlFor="budget">Budget in USD <span>(optional)</span></label><select id="budget" name="budget" defaultValue=""><option value="">Choose a range</option>{['Under $5,000','$5,000–$10,000','$10,000–$25,000','$25,000+','Let’s scope it first'].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field"><label htmlFor="timeline">Timeline <span>(optional)</span></label><select id="timeline" name="timeline" defaultValue=""><option value="">When do you need it?</option>{['As soon as practical','Within 1–3 months','Within 3–6 months','Exploring options'].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field full"><label htmlFor="message">A little more context <span>(optional)</span></label><textarea id="message" name="message" rows={4} maxLength={2000} placeholder="What problem are you trying to solve? Share the key workflows, current challenges or anything useful to know."/></div>
 <div className="form-footer"><button className="button" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':useNetlify?'Send project enquiry':'Prepare project enquiry'}<ArrowUpRight size={16}/></button><p>Your details are used to respond to this enquiry. <a href="/privacy/" style={{textDecoration:'underline'}}>Privacy details</a></p></div>
 {!useNetlify&&<p className="form-notice">Review your brief, then send it through your email app. Nothing is sent automatically.</p>}
 <noscript><p className="form-notice">To enquire without JavaScript, email <a href={`mailto:${site.email}`}>{site.email}</a> directly.</p></noscript>
 {state==='sent'&&<div className="form-result" role="status" ref={result} tabIndex={-1}><h3>Thank you. Your enquiry is received.</h3><p>I’ll review the details and reply to the email address you provided.</p></div>}
 {(state==='review'||state==='error')&&<div ref={result} tabIndex={-1} className={`form-result ${state==='error'?'form-error':''}`} role="status"><h3>{state==='error'?'Your enquiry could not be sent.':'Your brief is ready to send.'}</h3><p>{state==='error'?'Your details are preserved below. You can send them directly by email instead.':'Open the draft in your email app and press send there. You can also copy the brief into any email service.'}</p><a className="text-link" href={enquiryMailto(site.email,values)}><Mail size={15}/> Open email draft <ArrowUpRight size={15}/></a><label className="sr-only" htmlFor="enquiry-preview">Your prepared enquiry</label><textarea id="enquiry-preview" readOnly value={formatEnquiry(values)}/><button type="button" className="text-link" style={{border:0,background:'none'}} onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Brief copied':'Copy enquiry text'}</button><p style={{overflowWrap:'anywhere'}}>Send to {site.email}</p></div>}
 </form>
}
