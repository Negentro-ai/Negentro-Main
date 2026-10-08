const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient('https://oxnycpedzdquflzvqujl.supabase.co', 'sb_publishable_jAVYqH-VSeOUjhzs9RDcvg_-Wsm1Xfp');

const ALLOWED_FACTS = ['BASE', 'MEMORY', 'EXTRACT', 'DEEP SEARCH'];

async function fixFacts() {
    console.log("Fetching records...");
    const { data: records, error } = await supabase.from('cms_records').select('*');
    
    if (error) {
        console.error("Error fetching:", error);
        return;
    }
    
    let updatedCount = 0;
    
    for (const record of records) {
        if (!record.blocks || !record.blocks[0] || !record.blocks[0].content) continue;
        
        try {
            const content = JSON.parse(record.blocks[0].content);
            if (content.facts && Array.isArray(content.facts)) {
                let originalLength = content.facts.length;
                let newFacts = [];
                
                for (const fact of content.facts) {
                    const label = fact.label.trim();
                    if (ALLOWED_FACTS.includes(label)) {
                        newFacts.push(fact);
                    } else if (label === 'Feature List') {
                        // Sometimes BASE is trapped inside Feature List
                        const val = fact.value;
                        const match = val.match(/\*\s*\*\*BASE:\*\*\s*(.*)/i) || val.match(/BASE:\s*(.*)/i);
                        if (match) {
                            newFacts.push({ label: 'BASE', value: match[1].trim() });
                        }
                    }
                }
                
                // Sort to ensure order: BASE, MEMORY, EXTRACT, DEEP SEARCH
                newFacts.sort((a, b) => ALLOWED_FACTS.indexOf(a.label) - ALLOWED_FACTS.indexOf(b.label));
                
                if (newFacts.length !== originalLength || newFacts.some((f, i) => f.label !== content.facts[i]?.label)) {
                    console.log(`Fixing facts for ${record.slug}`);
                    content.facts = newFacts;
                    
                    const updatedBlocks = [...record.blocks];
                    updatedBlocks[0].content = JSON.stringify(content);
                    
                    const { error: updateError } = await supabase
                        .from('cms_records')
                        .update({ blocks: updatedBlocks })
                        .eq('id', record.id);
                        
                    if (updateError) {
                        console.error(`Failed to update ${record.slug}:`, updateError);
                    } else {
                        updatedCount++;
                    }
                }
            }
        } catch (e) {
            console.error(`Failed to parse content for ${record.slug}`);
        }
    }
    
    console.log(`Successfully fixed ${updatedCount} records.`);
}

fixFacts();
