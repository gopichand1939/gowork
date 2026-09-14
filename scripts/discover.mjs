import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const dir = 'research/captures';
await fs.mkdir(dir, {recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const targets = [
 ['existing','https://gopichand-portfolio2026.netlify.app/'],
 ['bagel-master','https://bagelmaster.co.uk/'],
 ['bagel-menu','https://bagelmaster.co.uk/menu'],
 ['blr-hub','https://blrhub.online/dashboard'],
 ['Payment','https://admin.dc.Paymentpayment.com/'],
 ['oceanmax','https://oceanmax.netlify.app/'],
 ['buildmore','https://buildmoree.netlify.app/'],
 ['home-kitchen','https://madhurawadahomekitchen.netlify.app/'],
 ['learning-portal','https://learning-portal-lbce.netlify.app/'],
 ['jaitra','https://jaitra-application.netlify.app/'],
 ['snaptest','https://snaptest2025.netlify.app/'],
 ['hpr','https://hpr-infra.netlify.app/'],
];
const results=[];
for (let i=0;i<targets.length;i+=3) await Promise.all(targets.slice(i,i+3).map(async ([name,url])=>{
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1, reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try {
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForTimeout(6000);
  const text=await page.locator('body').innerText();
  const links=await page.locator('a').evaluateAll(as=>as.map(a=>({text:a.innerText,url:a.href})).filter(a=>a.text||/mailto|linkedin/.test(a.url)));
  // Fresh unauthenticated browser context: no private sessions or customer records are accessed.
  await page.screenshot({path:`${dir}/${name}-desktop.png`});
  await page.screenshot({path:`${dir}/${name}-full.png`,fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(1200);
  await page.screenshot({path:`${dir}/${name}-mobile.png`,fullPage:false});
  const data={name,url,finalUrl:page.url(),status:response?.status(),title:await page.title(),text,links,errors};
  results.push(data); console.log(JSON.stringify({name,status:data.status,title:data.title,text:text.slice(0,1100),links:links.filter(a=>/mailto|linkedin/.test(a.url)),errors}));
 }catch(e){results.push({name,url,error:e.message});console.log(name,e.message)}finally{await page.close()}
}));
await fs.writeFile('research/live-inspection.json',JSON.stringify(results,null,2));
await browser.close();
