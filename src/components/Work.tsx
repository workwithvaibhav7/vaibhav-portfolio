import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Motion Graphics Talking Head Short",
    category: "Motion Graphics",
    tools: "After Effects, Premiere Pro, Motion Design",
    videoId: "1KrdgpQS2po3DXBfb8njJLkHIo2CWKId8",
  },
  {
    title: "Short Form Edit",
    category: "Video Editing",
    tools: "Premiere Pro, After Effects, Color Grading",
    videoId: "1LRn9F7J0w1BzuYhzt7uSPzo5B3zRW6cp",
  },
  {
    title: "Motion Graphic Reel Edit",
    category: "Motion Graphics",
    tools: "After Effects, Premiere Pro, Motion Design",
    videoId: "17Wg7gomIdSws5v3gOuafHXN_yyZ4S1zZ",
  },
  {
    title: "Typography Edit",
    category: "Video Editing",
    tools: "After Effects, Premiere Pro, Typography",
    videoId: "1SEZUoEFH1Ci2l1Tc9cCRoNxO4X3u7DYw",
  },
  {
    title: "3D Product Visualisation",
    category: "3D Art",
    tools: "Blender, HDRI Lighting, Compositing",
    videoId: "13Dnc9xcnJT5Gjdf0w4LGVMC1xXEewmAt",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
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
                        src={`https://drive.google.com/file/d/${project.videoId}/preview`}
                        width="100%"
                        height="100%"
                        allow="autoplay"
                        style={{
                          border: "none",
                          borderRadius: "8px",
                          minHeight: "320px",
                        }}
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
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
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
