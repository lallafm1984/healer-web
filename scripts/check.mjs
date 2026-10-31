import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '../dist');
const files = [];
async function walk(p) { for(const name of await readdir(p)){ const f=resolve(p,name); (await stat(f)).isDirectory() ? await walk(f) : files.push(f); } }
await walk(root);
let checks=0;
for(const file of files.filter(f=>f.endsWith('.html'))){
 const html=await readFile(file,'utf8');
 if((html.match(/<h1[ >]/g)||[]).length!==1) throw Error(`Expected one h1: ${file}`);
 if(!html.includes('<html lang="ko">')) throw Error(`Missing document language: ${file}`);
 if(!html.includes('name="description"')||!html.includes('rel="canonical"')) throw Error(`Missing SEO metadata: ${file}`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length) throw Error(`Duplicate id: ${file}`);
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const link=m[1];
  if(/^(https?:|mailto:)/.test(link)) continue;
  const [path,hash]=link.split('#');
  let target=path ? resolve(root,'.'+path) : file;
  if(path?.endsWith('/')) target=resolve(target,'index.html');
  const data=await readFile(target).catch(()=>{throw Error(`Broken local reference ${link} in ${file}`)});
  if(hash&&!data.toString().includes(`id="${hash}"`)) throw Error(`Missing anchor ${link}`);
  checks++;
 }
}
for (const file of files.filter(f=>f.endsWith('.js'))) execFileSync(process.execPath,['--check',file]);
const home = await readFile(resolve(root,'index.html'),'utf8');
if (/개발 중|개발 빌드|일부 다를 수|소개 일러스트/.test(home)) throw Error('Pre-release development notice remains on landing page');
console.log(`Passed: ${files.filter(f=>f.endsWith('.html')).length} HTML pages, ${checks} local references, metadata, unique IDs, anchors and JavaScript syntax.`);
