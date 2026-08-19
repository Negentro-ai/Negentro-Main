import fs from 'fs';

const fragments = fs.readFileSync('extracted_fragments.txt', 'utf-8').split('\n');
let fullText = '';
fragments.forEach((frag) => {
  const unescaped = frag.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\u0026/g, '&');
  fullText += unescaped;
});

fs.writeFileSync('full_extracted_doc.html', fullText);
console.log("Full extracted document length:", fullText.length);
