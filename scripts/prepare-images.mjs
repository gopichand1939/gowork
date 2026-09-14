import sharp from 'sharp';
import fs from 'node:fs/promises';
await fs.mkdir('public/images',{recursive:true});
for(const name of ['bagel-master','bagel-menu','oceanmax','buildmore','home-kitchen']){
 for(const width of [800,1440])await sharp(`research/captures/${name}-desktop.png`).resize({width}).webp({quality:85,effort:5}).toFile(`public/images/${name}-${width}.webp`);
 if(name!=='bagel-menu')await sharp(`research/captures/${name}-mobile.png`).webp({quality:85,effort:5}).toFile(`public/images/${name}-mobile.webp`);
}
console.log('Prepared 14 responsive WebP assets from inspected public website captures.');
