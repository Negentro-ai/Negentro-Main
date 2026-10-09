import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Footer } from './Footer';

const faqs = [
  { question: "What is token efficient memory algorithm?", answer: "Negentro's memory algorithm optimizes context window usage by dynamically compressing and retrieving only the most relevant tokens for any given query, reducing overhead by up to 74x." },
  { question: "How does it compare to standard vector DBs?", answer: "Unlike standard vector databases which rely purely on dense embeddings and nearest neighbor search, our algorithm uses a hybrid approach with bitemporal indexing to ensure constant time O(1) recall with minimal memory footprint." },
  { question: "What is PII redaction and how does it work?", answer: "Our built-in PII redaction automatically identifies and strips personally identifiable information before data is embedded, ensuring compliance without sacrificing search accuracy." },
  { question: "Is support for other databases on the roadmap?", answer: "Yes, we are actively developing integrations for Qdrant, Weaviate, and Chroma. Stay tuned for our upcoming releases." },
  { question: "How do I migrate from Pinecone or Milvus?", answer: "We provide an open-source migration tool that securely transfers your vectors and metadata into Negentro's memory format with zero downtime." },
  { question: "Does this require hosting a separate database?", answer: "No, Negentro provides a fully managed infrastructure, allowing you to focus on building your AI agents without worrying about database maintenance." },
  { question: "Are the privacy-centric features HIPAA compliant?", answer: "Yes, our enterprise tier includes full HIPAA compliance, SOC2 certification, and zero-leakage architecture guarantees." },
];

export const ResearchPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('Memory');
  const [activeNewTab, setActiveNewTab] = useState('Hybrid search in any database');

  return (
    <div className="w-full min-h-screen bg-[#fafbfc] text-neutral-900 font-sans selection:bg-[#765DFB] selection:text-white pt-20">
      
      {/* Hero Section */}
      <section className="container-universal mx-auto px-6 py-12 lg:py-20 relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          <div className="flex-1 max-w-2xl relative z-10">
            <p className="text-[12px] font-semibold text-[#765DFB] tracking-widest mb-4 uppercase">
              Negentro Research / Benchmarks
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight leading-[1.05] mb-6 text-neutral-950">
              Benchmarking token efficient memory algorithm
            </h1>
            <p className="text-[16px] md:text-[18px] text-neutral-500 leading-relaxed mb-8 max-w-xl">
              We evaluated the algorithm against standard vector databases (Pinecone, Milvus) over long contexts, demonstrating up to 74x lower memory usage while retaining exact O(1) recall.
            </p>
            <div className="flex items-center gap-4">
              <button className="h-11 px-6 rounded-lg bg-[#765DFB] hover:bg-[#6349E0] text-white text-sm font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer">
                View Github <ArrowRight className="w-4 h-4" />
              </button>
              <button className="h-11 px-6 rounded-lg bg-white border border-neutral-200 text-[#765DFB] hover:bg-neutral-50 text-sm font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer">
                Read Research <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center lg:justify-end items-center">
            {/* Using a placeholder for the wireframe globe */}
            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-linear-to-tr from-[#765DFB]/20 to-[#B49CFF]/10 blur-xl absolute opacity-60 mix-blend-multiply" />
            <img src="/assets/use-cases/hero_server_room.jpg" alt="Wireframe Globe Placeholder" className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-cover rounded-full mix-blend-luminosity opacity-30 shadow-2xl relative z-10 scale-95" />
          </div>
        </div>

        {/* Stats Row underneath Hero */}
        <div className="mt-20 bg-white border border-neutral-100 rounded-2xl shadow-sm p-6 md:p-10 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-4 pr-0 lg:pr-10 lg:border-r border-neutral-100">
            {[
              { label: 'RECALL', value: 92.6 },
              { label: 'PRECISION', value: 94.4 },
              { label: 'FALLOUT', value: 14.2 },
              { label: 'F1 SCORE', value: 93.6 }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 text-xs font-semibold text-neutral-400">
                <span className="w-20 tracking-wider uppercase">{stat.label}</span>
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#765DFB] rounded-full" style={{ width: `${stat.value}%` }} />
                </div>
                <span className="w-8 text-right text-[#765DFB]">{stat.value}</span>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 font-medium">Pinecone / Vector DB</span>
                <span className="text-neutral-900 font-bold">14 ms</span>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-300 w-[80%]" />
              </div>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-[#765DFB] font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#765DFB]" />
                  Negentro
                </span>
                <span className="text-[#765DFB] font-bold">4.12 ms</span>
              </div>
              <div className="h-2 w-full bg-[#765DFB]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#765DFB] w-[30%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Deep-Dives */}
      <section className="container-universal mx-auto px-6 py-20 border-t border-neutral-100">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-950 mb-3">Benchmark deep-dives</h2>
          <p className="text-neutral-500 text-base max-w-xl">Compare our new system with state-of-the-art across all vector databases.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
            {['Memory', 'Compute Cost', 'Recall Rate', 'Latency (P99)'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-5 py-3.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-white shadow-sm text-neutral-900 border border-neutral-200/60' 
                    : 'text-neutral-500 hover:bg-neutral-100/50 hover:text-neutral-900 border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex-1 bg-white border border-neutral-100 rounded-3xl shadow-sm p-8 md:p-12 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-1 flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#765DFB] flex items-center justify-center text-white text-xs font-bold">N</span>
                  Negentro <span className="text-sm font-normal text-neutral-400 ml-2">(Ours)</span>
                </h3>
                <p className="text-neutral-500 text-sm max-w-md mt-3 leading-relaxed">
                  Our system achieves a 74x lower memory usage footprint by optimizing embedding precision limits on the fly without loss of recall.
                </p>
              </div>
              <div className="flex gap-6 md:gap-10 border-l border-neutral-100 pl-6 md:pl-10">
                <div>
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">Memory</p>
                  <p className="text-3xl md:text-4xl font-semibold text-[#765DFB]">412 <span className="text-lg text-neutral-400 font-normal">MB</span></p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">Compute</p>
                  <p className="text-3xl md:text-4xl font-semibold text-neutral-900">3.09 <span className="text-lg text-neutral-400 font-normal">B</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Pinecone', val: 95 },
                { name: 'Milvus', val: 82 },
                { name: 'Qdrant', val: 78 },
                { name: 'Weaviate', val: 88 }
              ].map(db => (
                <div key={db.name} className="flex items-center gap-6">
                  <span className="w-24 text-sm font-semibold text-neutral-900">{db.name}</span>
                  <div className="flex-1 flex gap-1">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-sm ${i < (db.val/100)*40 ? 'bg-neutral-200' : 'bg-neutral-100'}`} />
                    ))}
                  </div>
                  <span className="w-12 text-right text-xs font-mono text-neutral-400">{db.val}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-6 border-t border-neutral-100 flex justify-end">
              <button className="text-sm font-medium text-[#765DFB] hover:text-[#6349E0] flex items-center gap-2 cursor-pointer">
                Read full report <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why the numbers look this way */}
      <section className="container-universal mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-950 max-w-sm">Why the numbers look this way?</h2>
          <p className="text-neutral-500 text-sm max-w-md">Our architecture introduces a novel retrieval pattern based on temporal clustering and semantic pruning.</p>
        </div>

        <div className="flex flex-col">
          {[
            { title: "Recall correctness", val: "97.6%", desc: "By pruning irrelevant vectors early in the retrieval tree, we achieve higher accuracy on long-context queries without resorting to exhaustive search. This significantly reduces noise in the final results." },
            { title: "Constant compute", val: "~7,000", desc: "The retrieval latency scales sub-linearly relative to the size of the dataset. Operations per query remain constant around 7,000 floating point operations even at billion-scale datasets." },
            { title: "Response times", val: "<4 ms", desc: "With our custom distributed query router written in Rust, we completely eliminate garbage collection pauses, delivering a strict P99 latency of under 4 milliseconds." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-t border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 w-full md:w-1/4 pt-1">{item.title}</h3>
              <p className="text-3xl md:text-4xl font-medium text-[#765DFB] w-full md:w-1/4 tracking-tight">{item.val}</p>
              <p className="text-neutral-500 leading-relaxed text-sm w-full md:w-1/2 pt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's new */}
      <section className="bg-white py-24 border-y border-neutral-100">
        <div className="container-universal mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-950 mb-3">What's new on Negentro?</h2>
            <p className="text-neutral-500 text-base max-w-2xl">Read our technical deep-dives to discover exactly how we engineered the memory layer that powers the next generation of AI agents.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="w-full lg:w-[350px] bg-[#fafbfc] border border-neutral-100 rounded-3xl p-4 flex flex-col gap-2">
              {['Hybrid search in any database', 'PII redaction API', 'Temporal reasoning', 'New Embeddings'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveNewTab(tab)}
                  className={`text-left p-6 rounded-2xl transition-all cursor-pointer ${
                    activeNewTab === tab 
                      ? 'bg-white shadow-sm border border-neutral-200/50' 
                      : 'hover:bg-neutral-100/50 border border-transparent'
                  }`}
                >
                  <h4 className={`text-[15px] font-semibold mb-2 ${activeNewTab === tab ? 'text-neutral-900' : 'text-neutral-600'}`}>{tab}</h4>
                  {activeNewTab === tab && (
                    <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                      Combine dense vector embeddings with sparse keyword search (BM25) out of the box. No infrastructure changes required.
                    </p>
                  )}
                  {activeNewTab === tab && (
                    <span className="text-[13px] font-medium text-[#765DFB] flex items-center gap-1.5">Read article <ArrowRight className="w-3.5 h-3.5" /></span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-[#fafbfc] border border-neutral-100 rounded-3xl p-10 flex items-center justify-center min-h-[400px]">
              <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
                {/* Simplified Diagram Placeholder */}
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 tracking-wider">
                    <div className="px-4 py-2 rounded border border-neutral-200">USER QUERY</div>
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                    <div className="px-4 py-2 rounded border border-[#765DFB] text-[#765DFB] bg-[#765DFB]/5">EMBEDDER</div>
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                    <div className="px-4 py-2 rounded border border-neutral-200">HYBRID SEARCH</div>
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                    <div className="px-4 py-2 rounded border border-neutral-200">RESULTS</div>
                  </div>
                  <div className="h-px bg-neutral-100 w-full relative">
                    <div className="absolute left-1/3 top-0 w-px h-12 bg-neutral-200" />
                    <div className="absolute left-2/3 top-0 w-px h-12 bg-neutral-200" />
                  </div>
                  <div className="flex justify-around items-center text-xs font-medium text-neutral-500">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-[#765DFB]" /> BM25 Index</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-[#765DFB]" /> HNSW Graph</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Read the research */}
      <section className="container-universal mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-950">Read the research</h2>
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#765DFB] hover:text-[#6349E0] cursor-pointer">
            View all articles <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 group cursor-pointer hover:shadow-md transition-shadow">
            <div className="h-64 bg-linear-to-br from-[#765DFB] to-[#927CFF] p-8 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              <div className="relative z-10 grid grid-cols-3 gap-2 opacity-50">
                {Array.from({length: 45}).map((_, i) => (
                  <div key={i} className="h-1.5 w-8 bg-white rounded-full" />
                ))}
              </div>
              <div className="relative z-10 flex flex-col gap-4 pl-8 border-l border-white/20">
                <div><p className="text-white text-3xl font-bold tracking-tight">92.6</p><p className="text-white/60 text-xs font-medium uppercase tracking-widest">Recall</p></div>
                <div><p className="text-white text-3xl font-bold tracking-tight">94.4</p><p className="text-white/60 text-xs font-medium uppercase tracking-widest">Precision</p></div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-[11px] font-semibold text-[#765DFB] tracking-widest uppercase mb-3">Research</p>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-[#765DFB] transition-colors">Introducing The Token Efficient Memory Algorithm</h3>
              <p className="text-xs text-neutral-400 font-medium">May 15, 2024</p>
            </div>
          </div>

          {/* List Cards */}
          <div className="flex flex-col gap-6">
            {[
              { title: 'Addressing Privacy Concerns in Generative AI Systems', tag: 'Security', date: 'May 1, 2024' },
              { title: 'Introducing Temporal Reasoning in Agents', tag: 'Product', date: 'Apr 15, 2024' },
              { title: 'Fine-tuning vs Prompt Prefix: A deep dive', tag: 'Research', date: 'Apr 1, 2024' }
            ].map((article, i) => (
              <div key={i} className="flex gap-6 items-center p-5 bg-white rounded-2xl border border-neutral-200 group cursor-pointer hover:shadow-sm transition-shadow">
                <div className="w-32 h-24 rounded-xl bg-neutral-100 flex items-center justify-center p-3">
                  <div className="w-full h-full border border-neutral-200 border-dashed rounded opacity-50 flex flex-wrap gap-1 content-start p-1.5">
                     {Array.from({length: 12}).map((_, j) => <div key={j} className="w-4 h-1.5 bg-[#765DFB]/30 rounded-full" />)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-[#765DFB] tracking-widest uppercase mb-2">{article.tag}</p>
                  <h4 className="text-lg font-bold text-neutral-900 leading-tight mb-2 group-hover:text-[#765DFB] transition-colors">{article.title}</h4>
                  <p className="text-xs text-neutral-400 font-medium">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-24 border-t border-neutral-100">
        <div className="container-universal mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-950 w-full md:w-1/3">Frequently asked questions</h2>
            <div className="w-full md:w-2/3 space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-neutral-100 last:border-0 pb-2">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-5 text-left focus:outline-none group cursor-pointer"
                  >
                    <span className={`text-[17px] font-medium transition-colors ${activeFaq === index ? 'text-[#765DFB]' : 'text-neutral-800 group-hover:text-[#765DFB]'}`}>
                      {faq.question}
                    </span>
                    <span className="text-neutral-400 ml-4 shrink-0">
                      {activeFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[15px] text-neutral-500 leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="container-universal mx-auto px-6 pb-24">
        <div className="w-full bg-[#765DFB] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-lg mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">The full evaluation framework is open source</h2>
            <p className="text-white/80 text-[15px] leading-relaxed mb-8">
              We believe in reproducible research. All the scripts, datasets, and configurations used for this benchmark are freely available on Github.
            </p>
            <button className="h-11 px-6 rounded-lg bg-white text-[#765DFB] hover:bg-neutral-50 text-sm font-medium transition-all shadow-sm cursor-pointer">
              View on Github
            </button>
          </div>

          <div className="relative z-10 w-full md:w-[350px] flex justify-center md:justify-end">
            <div className="w-48 h-48 sm:w-64 sm:h-64 border-4 border-white/20 rounded-full flex flex-col justify-center items-center gap-3">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="h-1.5 w-3/4 bg-white/30 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#fafbfc] py-32 border-t border-neutral-100 text-center">
        <div className="container-universal mx-auto px-6">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium text-neutral-900 mb-2 tracking-tight leading-[1.05]">
            Give your AI
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium text-neutral-900 mb-10 tracking-tight leading-[1.05]">
            memory and <span className="text-[#765DFB] font-serif italic font-normal">personality</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <button className="h-11 px-8 rounded-lg bg-[#765DFB] hover:bg-[#6349E0] text-white text-sm font-medium transition-all shadow-sm cursor-pointer">
              Start building
            </button>
            <button className="h-11 px-8 rounded-lg bg-neutral-900 hover:bg-black text-white text-sm font-medium transition-all shadow-sm cursor-pointer">
              Talk to us
            </button>
          </div>
        </div>
      </section>

      <Footer onOpenConsole={() => {}} />
    </div>
  );
};
