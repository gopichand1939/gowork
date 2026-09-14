export const enquiryFields = ['name','company','email','project','type','budget','timeline','message'];
export function formatEnquiry(values){
 const field=(name)=>String(values[name]||'Not specified').trim();
 return `Project enquiry\n\nName: ${field('name')}\nCompany: ${field('company')}\nEmail: ${field('email')}\n\nWhat I am building: ${field('project')}\nProject type: ${field('type')}\nBudget (USD): ${field('budget')}\nTimeline: ${field('timeline')}\n\n${field('message')}`;
}
export function enquiryMailto(email,values){return `mailto:${email}?subject=${encodeURIComponent(`Project enquiry: ${String(values.project||'New project').replace(/[\r\n]/g,' ').slice(0,120)}`)}&body=${encodeURIComponent(formatEnquiry(values))}`}
