import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await supabase.from("contact_messages").insert([form]);
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:workwithvaibhav7@gmail.com" data-cursor="disable">
                workwithvaibhav7@gmail.com
              </a>
            </p>
            <h4 style={{ marginTop: "20px" }}>Social</h4>
            <a href="https://www.linkedin.com/in/vaibhav-suneja-939991279/" target="_blank" data-cursor="disable" className="contact-social">
              Linkedin <MdArrowOutward />
            </a>
            <a href="https://www.instagram.com/trezor.exe/" target="_blank" data-cursor="disable" className="contact-social">
              Instagram <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h4>Send a Message</h4>
            {sent ? (
              <p style={{ color: "#FF4D6D", marginTop: "12px" }}>Message sent! I'll get back to you soon. 🙌</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#fff", fontSize: "14px" }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#fff", fontSize: "14px" }}
                />
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#fff", fontSize: "14px", resize: "none" }}
                />
                <button type="submit" disabled={sending} style={{ background: "#FF4D6D", border: "none", borderRadius: "8px", padding: "12px", color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="contact-box">
            <h2 className="contact-quote">
              Editing isn't decoration—it's transformation. I turn static stories into visual adrenaline.
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
