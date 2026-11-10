import React, { useState } from 'react';
import { Terminal, ArrowUpRight, Check, Copy, MapPin, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bhatpallavi.24@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="section-rail pt-20 pb-16">
      {/* Header */}
      <div className="border-b border-[rgba(173,186,205,0.12)] pb-4 mb-10">
        <p className="eyebrow mb-1">05 / Get in touch</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E8EAED]">
          A little signal<span className="text-[#3DDC97]">.</span>{' '}
          <span className="text-[#858e9c] italic font-serif">None of the noise.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Terminal Form Box (7 cols) */}
        <div className="lg:col-span-7 border border-[rgba(173,186,205,0.15)] rounded-md p-6 sm:p-8 bg-[#141b28]/80 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-[#3DDC97] font-mono text-xs">
              <Terminal size={16} />
              <span>terminal@pallavi:~$ send-dispatch</span>
            </div>
            <span className="status-dot"></span>
          </div>

          <p className="text-sm text-[#a2a9b4] leading-relaxed mb-6">
            Whether you have an engineering role, a frontend project, or just want to discuss web systems, my inbox is open.
          </p>

          {submitted ? (
            <div className="py-10 text-center space-y-3 font-mono">
              <div className="w-10 h-10 rounded-full bg-[#3DDC97]/10 border border-[#3DDC97]/30 flex items-center justify-center text-[#3DDC97] mx-auto">
                <Check size={20} />
              </div>
              <div className="text-sm font-semibold text-[#E8EAED]">Message Dispatched</div>
              <p className="text-xs text-[#858e9c] max-w-sm mx-auto font-sans">
                Thank you, <strong className="text-white">{formData.name}</strong>. I will get back to your email at <span className="text-[#3DDC97] font-mono">{formData.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="text-xs text-[#3DDC97] hover:underline cursor-pointer pt-2"
              >
                // Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-[#858e9c] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full bg-[#0b101a] border border-[rgba(173,186,205,0.15)] rounded px-3 py-2 text-sm text-[#E8EAED] placeholder-[#5B6472] focus:outline-none focus:border-[#3DDC97] transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-[#858e9c] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full bg-[#0b101a] border border-[rgba(173,186,205,0.15)] rounded px-3 py-2 text-sm text-[#E8EAED] placeholder-[#5B6472] focus:outline-none focus:border-[#3DDC97] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#858e9c] uppercase tracking-wider mb-1.5">
                  Message / Project Scope
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team or project..."
                  className="w-full bg-[#0b101a] border border-[rgba(173,186,205,0.15)] rounded px-3 py-2 text-sm text-[#E8EAED] placeholder-[#5B6472] focus:outline-none focus:border-[#3DDC97] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-[#3DDC97] text-[#0F1420] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#34c888] transition-all cursor-pointer shadow-sm"
              >
                <span>Send Dispatch</span>
                <ArrowUpRight size={14} />
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[rgba(173,186,205,0.08)] flex items-center justify-between font-mono text-[11px] text-[#5B6472]">
            <span>// fast response time</span>
            <span>no spam guarantee</span>
          </div>
        </div>

        {/* Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-3 font-mono">
          {/* Email Card */}
          <div className="border border-[rgba(173,186,205,0.15)] rounded-md p-4 bg-[#141b28]/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.12)] flex items-center justify-center text-[#3DDC97]">
                <Mail size={15} />
              </div>
              <div>
                <div className="text-[10px] text-[#5B6472] uppercase tracking-wider">Email Address</div>
                <a
                  href="mailto:bhatpallavi.24@gmail.com"
                  className="text-xs text-[#E8EAED] hover:text-[#3DDC97] transition-colors"
                >
                  bhatpallavi.24@gmail.com
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              title="Copy Email"
              className="p-1.5 text-[#858e9c] hover:text-[#3DDC97] transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check size={14} className="text-[#3DDC97]" /> : <Copy size={14} />}
            </button>
          </div>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/pallavisbhat"
            target="_blank"
            rel="noreferrer"
            className="border border-[rgba(173,186,205,0.15)] rounded-md p-4 bg-[#141b28]/70 flex items-center justify-between hover:border-[#3DDC97]/40 transition-colors block group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.12)] flex items-center justify-center text-[#3DDC97]">
                <LinkedinIcon size={15} />
              </div>
              <div>
                <div className="text-[10px] text-[#5B6472] uppercase tracking-wider">LinkedIn</div>
                <div className="text-xs text-[#E8EAED] group-hover:text-[#3DDC97] transition-colors">
                  /in/pallavisbhat
                </div>
              </div>
            </div>
            <ArrowUpRight size={14} className="text-[#5B6472] group-hover:text-[#3DDC97] transition-colors" />
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/Pallavi-SBhat"
            target="_blank"
            rel="noreferrer"
            className="border border-[rgba(173,186,205,0.15)] rounded-md p-4 bg-[#141b28]/70 flex items-center justify-between hover:border-[#3DDC97]/40 transition-colors block group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.12)] flex items-center justify-center text-[#3DDC97]">
                <GithubIcon size={15} />
              </div>
              <div>
                <div className="text-[10px] text-[#5B6472] uppercase tracking-wider">GitHub</div>
                <div className="text-xs text-[#E8EAED] group-hover:text-[#3DDC97] transition-colors">
                  /Pallavi-SBhat
                </div>
              </div>
            </div>
            <ArrowUpRight size={14} className="text-[#5B6472] group-hover:text-[#3DDC97] transition-colors" />
          </a>

          {/* Phone Card */}
          <a
            href="tel:7259932987"
            className="border border-[rgba(173,186,205,0.15)] rounded-md p-4 bg-[#141b28]/70 flex items-center justify-between hover:border-[#3DDC97]/40 transition-colors block group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.12)] flex items-center justify-center text-[#3DDC97]">
                <Phone size={15} />
              </div>
              <div>
                <div className="text-[10px] text-[#5B6472] uppercase tracking-wider">Direct Phone</div>
                <div className="text-xs text-[#E8EAED] group-hover:text-[#3DDC97] transition-colors">
                  +91 72599 32987
                </div>
              </div>
            </div>
            <ArrowUpRight size={14} className="text-[#5B6472] group-hover:text-[#3DDC97] transition-colors" />
          </a>

          {/* Location Card */}
          <div className="border border-[rgba(173,186,205,0.15)] rounded-md p-4 bg-[#141b28]/70 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.12)] flex items-center justify-center text-[#5B6472]">
              <MapPin size={15} />
            </div>
            <div>
              <div className="text-[10px] text-[#5B6472] uppercase tracking-wider">Location</div>
              <div className="text-xs text-[#E8EAED]">Mangaluru, Karnataka, India</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <span className="font-mono text-xs text-[#5B6472]">// stay curious</span>
      </div>
    </section>
  );
};

export default Contact;
