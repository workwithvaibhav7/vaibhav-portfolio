import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./Dashboard.css";

const DASHBOARD_PASSWORD = "vaibhav@dashboard2025";

interface Video { id: string; title: string; category: string; tools: string; video_id: string; order_index: number; }
interface CareerItem { id: string; role: string; company: string; year: string; description: string; order_index: number; }
interface Message { id: string; name: string; email: string; message: string; created_at: string; is_read: boolean; }

const Dashboard = () => {
  const [authed, setAuthed] = useState(false); // refresh pe reset
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"videos" | "bio" | "career" | "messages">("videos");

  // Videos state
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideo, setNewVideo] = useState({ title: "", category: "", tools: "", video_id: "", order_index: 0 });
  const [editVideo, setEditVideo] = useState<Video | null>(null);

  // Bio state
  const [bio, setBio] = useState("");
  const [bioId, setBioId] = useState("");

  // Career state
  const [career, setCareer] = useState<CareerItem[]>([]);
  const [newCareer, setNewCareer] = useState({ role: "", company: "", year: "", description: "", order_index: 0 });
  const [editCareer, setEditCareer] = useState<CareerItem | null>(null);

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    if (!authed) return;
    fetchAll();
  }, [authed]);

  const fetchAll = async () => {
    const [v, b, c, m] = await Promise.all([
      supabase.from("videos").select("*").order("order_index"),
      supabase.from("bio").select("*").single(),
      supabase.from("career").select("*").order("order_index"),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (v.data) setVideos(v.data);
    if (b.data) { setBio(b.data.description); setBioId(b.data.id); }
    if (c.data) setCareer(c.data);
    if (m.data) setMessages(m.data);
  };

  const handleLogin = () => {
    if (password === DASHBOARD_PASSWORD) setAuthed(true);
    else alert("Wrong password!");
  };

  // Videos CRUD
  const addVideo = async () => {
    setSaving(true);
    await supabase.from("videos").insert([{ ...newVideo, order_index: videos.length + 1 }]);
    setNewVideo({ title: "", category: "", tools: "", video_id: "", order_index: 0 });
    await fetchAll();
    showToast("Video added!");
    setSaving(false);
  };

  const updateVideo = async () => {
    if (!editVideo) return;
    setSaving(true);
    await supabase.from("videos").update(editVideo).eq("id", editVideo.id);
    setEditVideo(null);
    await fetchAll();
    showToast("Video updated!");
    setSaving(false);
  };

  const deleteVideo = async (id: string) => {
    await supabase.from("videos").delete().eq("id", id);
    await fetchAll();
    showToast("Video deleted!");
  };

  // Bio update
  const updateBio = async () => {
    setSaving(true);
    await supabase.from("bio").update({ description: bio }).eq("id", bioId);
    showToast("Bio updated!");
    setSaving(false);
  };

  // Career CRUD
  const addCareer = async () => {
    setSaving(true);
    await supabase.from("career").insert([{ ...newCareer, order_index: career.length + 1 }]);
    setNewCareer({ role: "", company: "", year: "", description: "", order_index: 0 });
    await fetchAll();
    showToast("Career item added!");
    setSaving(false);
  };

  const updateCareer = async () => {
    if (!editCareer) return;
    setSaving(true);
    await supabase.from("career").update(editCareer).eq("id", editCareer.id);
    setEditCareer(null);
    await fetchAll();
    showToast("Career updated!");
    setSaving(false);
  };

  const deleteCareer = async (id: string) => {
    await supabase.from("career").delete().eq("id", id);
    await fetchAll();
    showToast("Career item deleted!");
  };

  // Mark message as read
  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    await fetchAll();
  };

  const deleteMessage = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    await fetchAll();
    showToast("Message deleted!");
  };

  if (!authed) return (
    <div className="dash-login">
      <div className="dash-login-box">
        <h2>🔐 Dashboard Login</h2>
        <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      {toast && <div className="dash-toast">{toast}</div>}
      <div className="dash-header">
        <h1>⚡ Vaibhav's Dashboard</h1>
        <div className="dash-tabs">
          {(["videos", "bio", "career", "messages"] as const).map(t => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
              {t === "videos" ? "🎬 Videos" : t === "bio" ? "👤 Bio" : t === "career" ? "💼 Career" : `📩 Messages ${messages.filter(m => !m.is_read).length > 0 ? `(${messages.filter(m => !m.is_read).length})` : ""}`}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-content">

        {/* VIDEOS TAB */}
        {tab === "videos" && (
          <div>
            <h2>Videos</h2>
            <div className="dash-list">
              {videos.map(v => (
                <div className="dash-item" key={v.id}>
                  {editVideo?.id === v.id ? (
                    <div className="dash-edit-form">
                      <input value={editVideo.title} onChange={e => setEditVideo({ ...editVideo, title: e.target.value })} placeholder="Title" />
                      <input value={editVideo.category} onChange={e => setEditVideo({ ...editVideo, category: e.target.value })} placeholder="Category" />
                      <input value={editVideo.tools} onChange={e => setEditVideo({ ...editVideo, tools: e.target.value })} placeholder="Tools" />
                      <input value={editVideo.video_id} onChange={e => setEditVideo({ ...editVideo, video_id: e.target.value })} placeholder="Google Drive ID" />
                      <input type="number" value={editVideo.order_index} onChange={e => setEditVideo({ ...editVideo, order_index: Number(e.target.value) })} placeholder="Order" />
                      <div className="dash-btn-row">
                        <button className="save" onClick={updateVideo} disabled={saving}>Save</button>
                        <button className="cancel" onClick={() => setEditVideo(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="dash-item-row">
                      <div>
                        <strong>#{v.order_index} {v.title}</strong>
                        <span>{v.category}</span>
                      </div>
                      <div className="dash-btn-row">
                        <button className="edit" onClick={() => setEditVideo(v)}>Edit</button>
                        <button className="delete" onClick={() => deleteVideo(v.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: "32px" }}>Add New Video</h3>
            <div className="dash-add-form">
              <input value={newVideo.title} onChange={e => setNewVideo({ ...newVideo, title: e.target.value })} placeholder="Title" />
              <input value={newVideo.category} onChange={e => setNewVideo({ ...newVideo, category: e.target.value })} placeholder="Category" />
              <input value={newVideo.tools} onChange={e => setNewVideo({ ...newVideo, tools: e.target.value })} placeholder="Tools (comma separated)" />
              <input value={newVideo.video_id} onChange={e => setNewVideo({ ...newVideo, video_id: e.target.value })} placeholder="Google Drive File ID" />
              <button className="save" onClick={addVideo} disabled={saving}>Add Video</button>
            </div>
          </div>
        )}

        {/* BIO TAB */}
        {tab === "bio" && (
          <div>
            <h2>About Me / Bio</h2>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={8} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "16px", color: "#fff", fontSize: "15px", resize: "vertical" }} />
            <button className="save" style={{ marginTop: "16px" }} onClick={updateBio} disabled={saving}>Save Bio</button>
          </div>
        )}

        {/* CAREER TAB */}
        {tab === "career" && (
          <div>
            <h2>Career Timeline</h2>
            <div className="dash-list">
              {career.map(c => (
                <div className="dash-item" key={c.id}>
                  {editCareer?.id === c.id ? (
                    <div className="dash-edit-form">
                      <input value={editCareer.role} onChange={e => setEditCareer({ ...editCareer, role: e.target.value })} placeholder="Role" />
                      <input value={editCareer.company} onChange={e => setEditCareer({ ...editCareer, company: e.target.value })} placeholder="Company" />
                      <input value={editCareer.year} onChange={e => setEditCareer({ ...editCareer, year: e.target.value })} placeholder="Year" />
                      <textarea value={editCareer.description} onChange={e => setEditCareer({ ...editCareer, description: e.target.value })} placeholder="Description" rows={3} />
                      <input type="number" value={editCareer.order_index} onChange={e => setEditCareer({ ...editCareer, order_index: Number(e.target.value) })} placeholder="Order" />
                      <div className="dash-btn-row">
                        <button className="save" onClick={updateCareer} disabled={saving}>Save</button>
                        <button className="cancel" onClick={() => setEditCareer(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="dash-item-row">
                      <div>
                        <strong>{c.year} — {c.role}</strong>
                        <span>{c.company}</span>
                      </div>
                      <div className="dash-btn-row">
                        <button className="edit" onClick={() => setEditCareer(c)}>Edit</button>
                        <button className="delete" onClick={() => deleteCareer(c.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: "32px" }}>Add New</h3>
            <div className="dash-add-form">
              <input value={newCareer.role} onChange={e => setNewCareer({ ...newCareer, role: e.target.value })} placeholder="Role" />
              <input value={newCareer.company} onChange={e => setNewCareer({ ...newCareer, company: e.target.value })} placeholder="Company" />
              <input value={newCareer.year} onChange={e => setNewCareer({ ...newCareer, year: e.target.value })} placeholder="Year" />
              <textarea value={newCareer.description} onChange={e => setNewCareer({ ...newCareer, description: e.target.value })} placeholder="Description" rows={3} />
              <button className="save" onClick={addCareer} disabled={saving}>Add</button>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {tab === "messages" && (
          <div>
            <h2>Contact Messages</h2>
            {messages.length === 0 && <p style={{ opacity: 0.5 }}>No messages yet!</p>}
            <div className="dash-list">
              {messages.map(m => (
                <div className="dash-item" key={m.id} style={{ opacity: m.is_read ? 0.6 : 1 }}>
                  <div className="dash-msg">
                    <div className="dash-msg-header">
                      <strong>{m.name}</strong>
                      <span>{m.email}</span>
                      <span style={{ fontSize: "12px", opacity: 0.5 }}>{new Date(m.created_at).toLocaleDateString()}</span>
                      {!m.is_read && <span className="dash-unread">NEW</span>}
                    </div>
                    <p>{m.message}</p>
                    <div className="dash-btn-row">
                      {!m.is_read && <button className="edit" onClick={() => markRead(m.id)}>Mark Read</button>}
                      <button className="delete" onClick={() => deleteMessage(m.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
