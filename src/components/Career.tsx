import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Started Video Editing & Motion Graphics</h4>
                <h5>Self-Taught</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Began learning video editing and motion graphics from scratch.
              Built a strong foundation in pacing, color grading, and visual
              storytelling using Premiere Pro and After Effects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Professional Video Editor & Motion Designer</h4>
                <h5>Freelance</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Reached a professional level in video editing and motion graphics.
              Started delivering high-quality brand reels, cinematic edits, and
              motion content for clients and creators.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Pro Video Editor & Beginner 3D Artist</h4>
                <h5>Independent — New Delhi, India</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Delivering pro-level video editing and motion graphics for brands
              and digital platforms. Currently at the beginning stage of 3D
              artistry using Blender — expanding into product visualizations
              and 3D renders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
