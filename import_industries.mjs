import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  'https://oxnycpedzdquflzvqujl.supabase.co',
  'sb_publishable_jAVYqH-VSeOUjhzs9RDcvg_-Wsm1Xfp'
);

const files = [
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-40\\content_saas.md',
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-41\\content_media.md',
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-41\\content_legal.md',
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-41\\content_hr.md',
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-41\\content_ecommerce.md',
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-40\\content_consulting.md',
  'c:\\Users\\aashu\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\sessions\\4202F8578604B0B4864563C5CE221CDF406E8EF2\\transfers\\2026-41\\content_support.md'
];

function extract(regex, text, defaultValue = '') {
  const match = text.match(regex);
  return match ? match[1].trim() : defaultValue;
}

function parseCapabilities(sectionText) {
    const caps = [];
    const regex = /\*\*\d{2}\s+(.*?):\*\*\s*(.*)/g;
    let match;
    while ((match = regex.exec(sectionText)) !== null) {
        caps.push({ title: match[1].trim(), description: match[2].trim() });
    }
    return caps;
}

function parseFacts(sectionText) {
    const facts = [];
    // Extract everything after "* **Feature List:**" and before the next root bullet point
    const featureListMatch = sectionText.match(/\*\s+\*\*Feature List:\*\*([\s\S]*?)(?:\n\*\s+\*\*|$)/);
    if (featureListMatch) {
        const featureListText = featureListMatch[1];
        // Now extract the nested bullet points
        const regex = /\s*\*\s+\*\*(.*?):\*\*\s*(.*)/g;
        let match;
        while ((match = regex.exec(featureListText)) !== null) {
            facts.push({ label: match[1].trim(), value: match[2].trim() });
        }
    }
    return facts;
}

function parseFaqs(sectionText) {
    const faqs = [];
    const regex = /\*\s+\*\*Q:\*\*\s*(.*?)\n\s*\*\s+\*\*A:\*\*\s*(.*)/g;
    let match;
    while ((match = regex.exec(sectionText)) !== null) {
        faqs.push({ question: match[1].trim(), answer: match[2].trim() });
    }
    return faqs;
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

async function run() {
  const records = [];
  for (const file of files) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const slug = file.match(/content_(.*?)\.md/)[1];
        
        const sections = content.split('### Section').map(s => s.trim());
        
        const sec1 = sections[1] || '';
        const rawName = extract(/Breadcrumb:\*\*\s*`INDUSTRIES \/ (.*?)`/, sec1, slug);
        const name = toTitleCase(rawName.replace('&', ' & '));
        
        const heroTitle = extract(/Title:\*\*\s*(.*)/, sec1);
        const heroDescription = extract(/Description:\*\*\s*(.*)/, sec1);
        const facts = parseFacts(sec1);
        
        const sec2 = sections[2] || '';
        const contextTitle = extract(/Title:\*\*\s*(.*)/, sec2);
        const contextDescription = extract(/Description:\*\*\s*(.*)/, sec2);
        
        const sec3 = sections[3] || '';
        const introTitle = extract(/Title:\*\*\s*(.*)/, sec3);
        const introParagraphs = [
            extract(/Description \(Left\):\*\*\s*(.*)/, sec3),
            extract(/Description \(Right\):\*\*\s*(.*)/, sec3)
        ].filter(Boolean);
        
        const sec4 = sections[4] || '';
        const capabilitiesTitle = extract(/Title:\*\*\s*(.*)/, sec4);
        const capabilities = parseCapabilities(sec4);
        
        const sec5 = sections[5] || '';
        const infrastructureTitle = extract(/Title:\*\*\s*(.*)/, sec5);
        const problems = parseCapabilities(sec5);
        const rawFlowSteps = extract(/Right Panel Labels:\*\*\s*(.*)/, sec5);
        let flowSteps = ["SESSION", "CONTEXT", "MEMORY", "NEXT SESSION"];
        if (rawFlowSteps) {
            flowSteps = rawFlowSteps.split('|')
                .map(s => s.replace(/`/g, '').trim())
                .filter(s => s.match(/^\d{2}\s+/)) // Only keep the numbered ones
                .map(s => s.replace(/^\d{2}\s+/, ''));
        }
        
        const sec7 = sections[7] || '';
        const memoryTitle = extract(/Title:\*\*\s*(.*)/, sec7);
        const memoryDescription = extract(/Description:\*\*\s*(.*)/, sec7);
        const rawMemorySteps = extract(/Right Panel Steps:\*\*\s*(.*)/, sec7);
        const memorySteps = rawMemorySteps.split('|')
            .map(s => s.replace(/`/g, '').trim().replace(/^\d{2}\s+/, ''))
            .filter(Boolean);
        
        const sec8 = sections[8] || '';
        const getStartedTitle = extract(/Title:\*\*\s*(.*)/, sec8);
        const getStartedDescription = extract(/Description:\*\*\s*(.*)/, sec8);
        
        const sec9 = sections[9] || '';
        const faqs = parseFaqs(sec9);
        
        const sec10 = sections[10] || '';
        const finalCtaTitle = extract(/Title:\*\*\s*(.*)/, sec10);
        const finalCtaDescription = extract(/Description:\*\*\s*(.*)/, sec10);
        
        const industryData = {
            slug,
            name,
            heroTitle,
            heroDescription,
            facts,
            contextTitle,
            contextDescription,
            introTitle,
            introParagraphs,
            capabilitiesTitle,
            capabilities,
            infrastructureTitle,
            problems,
            flowSteps,
            architectureTitle: "The infrastructure underneath.",
            memoryTitle,
            memoryDescription,
            memorySteps,
            getStartedTitle,
            getStartedDescription,
            faqs,
            finalCtaTitle,
            finalCtaDescription
        };

        const record = {
            id: crypto.randomUUID(),
            kind: 'industries',
            title: name,
            slug: slug,
            category: 'Industry',
            summary: heroDescription,
            status: 'Published',
            updated_at: new Date().toISOString(),
            content: {
                blocks: [
                    {
                        id: crypto.randomUUID(),
                        type: 'hero',
                        content: JSON.stringify(industryData)
                    }
                ]
            }
        };
        records.push(record);
    } catch (e) {
        console.error(`Exception parsing ${file}:`, e.message);
    }
  }

  fs.writeFileSync('src/data/temp_industry_seed.json', JSON.stringify(records, null, 2));
  console.log("Successfully wrote all records to src/data/temp_industry_seed.json");
}

run();
