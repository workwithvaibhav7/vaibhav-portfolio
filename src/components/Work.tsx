import { useState, useCallback, useEffect } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { supabase } from "../lib/supabase";

interface Project {
  id: string;
  title: string;
  category: string;
  tools: string;
  video_id: string;
  order_index: number;
}

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from("videos")
        .select("*")
        .order("order_index");
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, projects.length]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, projects.length]);

  if (loading) return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <p style={{ color: "#fff", opacity: 0.5 }}>Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="carousel-wrapper">
          <button className="carousel-arrow carousel-arrow-left" onClick={goToPrev} aria-label="Previous project" data-cursor="disable">
            <MdArrowBack />
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Next project" data-cursor="disable">
            <MdArrowForward />
          </button>
          <div className="carousel-track-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {projects.map((project, index) => (
                <div className="carousel-slide" key={project.id}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <iframe
                        src={`https://drive.google.com/file/d/${project.video_id}/preview`}
                        width="100%"
                        height="100%"
                        allow="autoplay"
                        style={{ border: "none", borderRadius: "8px", minHeight: "320px" }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
