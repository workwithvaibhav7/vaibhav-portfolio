import { useEffect, useState } from "react";
import "./styles/About.css";
import { supabase } from "../lib/supabase";

const About = () => {
  const [bio, setBio] = useState("Video Editor & 3D Artist from New Delhi, India, focused on creating high-quality, visually engaging content. I specialize in cinematic edits and realistic 3D visuals — combining storytelling, clean aesthetics, and impactful delivery. From short-form content and brand reels to product visualizations, I bring ideas to life using Blender and After Effects. Precision meets creativity in every frame.");

  useEffect(() => {
    const fetchBio = async () => {
      const { data } = await supabase.from("bio").select("description").single();
      if (data) setBio(data.description);
    };
    fetchBio();
  }, []);

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{bio}</p>
      </div>
    </div>
  );
};

export default About;
