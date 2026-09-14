import {test} from 'node:test';
import assert from 'node:assert/strict';
import {enquiryMailto,formatEnquiry,enquiryFields} from '../lib/enquiry.mjs';
test('email draft preserves punctuation and all enquiry fields without creating extra headers',()=>{
 const values={name:'Jane & Co',email:'jane@example.com',company:'North + West',project:'Portal? phase #2\nBcc: bad@example.com',type:'Custom business platforms',budget:'$5,000–$10,000',timeline:'Within 1–3 months',message:'Roles & permissions\nA = B? Let’s discuss.'};
 const url=enquiryMailto('owner@example.com',values);const parsed=new URL(url);
 assert.equal(parsed.pathname,'owner@example.com');assert.equal(parsed.searchParams.size,2);assert.ok(!parsed.searchParams.get('subject').includes('\n'));assert.equal(parsed.searchParams.get('body'),formatEnquiry(values));
 for(const key of enquiryFields)assert.ok(formatEnquiry(values).includes(values[key]));
});
test('optional fields remain explicit and no success or delivery is implied by preparing a draft',()=>{const text=formatEnquiry({name:'A',email:'a@example.com',project:'A portal'});assert.match(text,/Company: Not specified/);assert.match(text,/Budget \(USD\): Not specified/);assert.doesNotMatch(text,/successfully sent/i)});
