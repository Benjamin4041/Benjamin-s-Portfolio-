import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Icon } from "@iconify/react";
import { Frame, SectionHeader } from "../components/Layout.jsx";
import content from "../data/content.json";

const EMAILJS = {
  service_id: "service_x0dyvcm",
  template_id: "template_3q93usl",
  user_id: "s8KTW-qJ8cs16HySg",
};

const SOCIALS = [
  { label: "GitHub", href: content.socials.github, icon: "mdi:github" },
  { label: "LinkedIn", href: content.socials.linkedin, icon: "mdi:linkedin" },
  { label: "X", href: content.socials.twitter, icon: "ri:twitter-x-fill" },
  { label: "Instagram", href: content.socials.instagram, icon: "mdi:instagram" },
];

const LABEL = "font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]";
const INPUT =
  "mt-1.5 w-full border border-[var(--line)] bg-[var(--chip)] px-3 py-2.5 text-[13px] text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--soft)] focus:border-[var(--soft)]";
const EMPTY_FORM = { name: "", email: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const update = (field) => (e) => setForm((current) => ({ ...current, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...EMAILJS,
          template_params: { from_name: form.name, email: form.email, message: form.message },
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("sent");
      setForm(EMPTY_FORM);
      resetTimer.current = setTimeout(() => setStatus("idle"), 4000);
    } catch {
      // If the send fails, hand the message to the visitor's mail app so it isn't lost.
      setStatus("idle");
      const subject = encodeURIComponent(`Message from ${form.name}`);
      window.location.href = `mailto:${content.email}?subject=${subject}&body=${encodeURIComponent(form.message)}`;
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL}>Name</span>
          <input required value={form.name} onChange={update("name")} placeholder="Your name" className={INPUT} />
        </label>
        <label className="block">
          <span className={LABEL}>Email</span>
          <input required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={INPUT} />
        </label>
      </div>
      <label className="block">
        <span className={LABEL}>Message</span>
        <textarea required rows={5} value={form.message} onChange={update("message")} placeholder="Tell me about your project" className={`${INPUT} resize-y`} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full cursor-pointer bg-[var(--fg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Message sent" : "Send message"}
      </button>
      <p aria-live="polite" className="text-[11px] text-[var(--muted)]">
        {status === "sent" ? "Thanks, I'll reply by email." : "I'll reply by email."}
      </p>
    </form>
  );
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the address stays visible and clickable.
    }
  };

  return (
    <div>
      <SectionHeader title="Contact" />
      <Frame>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b border-[var(--line)] p-6 md:border-r md:p-8">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)]">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[var(--fg)]">Direct Inbox</h3>
                <p className="text-xs text-[var(--muted)]">Best way to reach me</p>
              </div>
            </div>
            <div className="mt-6">
              <span className={LABEL}>Email Address</span>
              <div className="mt-2 flex items-center justify-between gap-3 border border-[var(--line)] bg-[var(--chip)] p-3">
                <a href={`mailto:${content.email}`} className="truncate font-mono text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                  {content.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email to clipboard"
                  className="shrink-0 cursor-pointer border border-[var(--line)] bg-[var(--bg)] p-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {copied ? <Check className="size-3.5 text-blue-400" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h4 className={`mb-3 ${LABEL}`}>Find Me Online</h4>
              <div className="grid grid-cols-2 gap-2">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[var(--line)] bg-[var(--chip)] px-3 py-2 text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    <Icon icon={icon} width={15} height={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between border-b border-[var(--line)] p-6 md:p-8">
            <div>
              <span className={LABEL}>Let's Work Together</span>
              <h3 className="mt-3 font-serif text-3xl font-normal leading-tight text-[var(--fg)]">
                Have an idea?
                <br />
                Let's build it.
              </h3>
              <p className="mt-4 max-w-md text-[13px] leading-6 text-[var(--muted)]">
                Whether you have a project, an opportunity, an interesting idea, or simply want to talk about technology, I'd love to hear from you.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
              <span className={LABEL}>Available For</span>
              <span className="text-right text-[11px] text-[var(--muted)]">Websites · Web Apps · Collaborations</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-[var(--line)] p-6 md:border-b-0 md:border-r md:p-8">
            <span className={LABEL}>Contact Form</span>
            <h3 className="mt-3 font-serif text-3xl font-normal text-[var(--fg)]">Send a message</h3>
          </div>
          <div className="p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </Frame>
    </div>
  );
}
