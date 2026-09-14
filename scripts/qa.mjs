import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
await fs.mkdir('test-results',{recursive:true});
const base='http://127.0.0.1:3000';const report={pages:[],interactions:[],errors:[]};
const routes=['/','/work/','/work/bagel-master/','/work/blr-hub/','/work/Payment/','/work/oceanmax/','/work/buildmore/','/work/madhurawada-home-kitchen/','/services/','/about/','/contact/','/privacy/'];
for(const width of [1440,768,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:1000},reducedMotion:'reduce'});const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));
 for(const route of routes){
  const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200,route);
  await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('h1').count(),1,`${route} heading`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,`${route} overflow at ${width}`);
  assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.getBoundingClientRect().top<innerHeight&&!i.complete||i.complete&&i.naturalWidth===0).length),0,`${route} broken images`);
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)});
  await page.waitForTimeout(500);
  assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).length),0,`${route} images loaded after scroll`);
  const checks=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  report.pages.push({route,width,title:await page.title(),overflow,violations:checks.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))}))});
  if(width!==768||route==='/'){await page.screenshot({path:`test-results/${route==='/'?'home':route.split('/').filter(Boolean).join('-')}-${width}.png`,fullPage:true});if(route==='/')await page.screenshot({path:`test-results/home-viewport-${width}.png`});}
 }
 await context.close();console.log(`Checked ${routes.length} routes at ${width}px`);
}
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.goto(base,{waitUntil:'networkidle'});await page.getByRole('button',{name:'Open navigation'}).click();assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).count(),0);assert.equal(await page.getByRole('button',{name:'Open navigation'}).evaluate(el=>el===document.activeElement),true);report.interactions.push('Mobile menu opens, Escape closes and restores focus');
await page.goto(base+'/work/');await page.getByRole('button',{name:'Business systems'}).click();assert.equal(await page.locator('.project-card').count(),2);await page.getByRole('button',{name:'Websites & experiences'}).click();assert.equal(await page.locator('.project-card').count(),4);await page.getByRole('button',{name:'All work'}).click();assert.equal(await page.locator('.project-card').count(),6);report.interactions.push('Project filters show 2 systems, 4 websites and 6 total');
await page.goto(base+'/contact/?project=BLR%20Hub');assert.match(await page.locator('#project').inputValue(),/BLR Hub/);await page.getByRole('button',{name:'Prepare project enquiry'}).click();assert.equal(await page.locator('#name').evaluate(el=>el.validity.valueMissing),true);assert.equal(await page.locator('.form-result').count(),0);
await page.locator('#name').fill('Jane Example');await page.locator('#email').fill('jane@example.com');await page.locator('#company').fill('Demo Company');await page.locator('#message').fill('An operations portal with roles & permissions.');await page.getByRole('button',{name:'Prepare project enquiry'}).click();await page.getByRole('heading',{name:'Your brief is ready to send.'}).waitFor();const href=await page.getByRole('link',{name:'Open email draft'}).getAttribute('href');assert.ok(href.startsWith('mailto:tummapalagopichand@gmail.com?'));assert.ok(decodeURIComponent(href).includes('Jane Example'));assert.ok(decodeURIComponent(href).includes('roles & permissions'));await page.screenshot({path:'test-results/contact-ready-mobile.png',fullPage:true});report.interactions.push('Enquiry validates required fields, preserves case-study context, and prepares a correctly encoded email draft');
await page.goto(base+'/contact/?type=Custom%20business%20platforms');assert.equal(await page.locator('#type').inputValue(),'Custom business platforms');report.interactions.push('Service CTA preselects project type');
await page.goto(base+'/services/');await page.getByText('Can you work with an existing product?',{exact:true}).click();assert.equal(await page.locator('details').first().getAttribute('open'),'');report.interactions.push('Service FAQs expand');
await page.goto(base);await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');report.interactions.push('Keyboard skip link is first focus target');
const unknown=await page.goto(base+'/not-a-real-page');assert.equal(unknown.status(),404);report.interactions.push('Unknown routes return custom 404');
await page.close();await browser.close();
await fs.writeFile('test-results/qa.json',JSON.stringify(report,null,2));
const violations=report.pages.flatMap(p=>p.violations.map(v=>({route:p.route,width:p.width,...v})));
console.log(JSON.stringify({pages:report.pages.length,interactions:report.interactions,errors:report.errors,violations:violations.map(v=>({route:v.route,width:v.width,id:v.id,nodes:v.nodes.map(n=>n.html)}))},null,2));
if(violations.length||report.errors.length)process.exitCode=1;
