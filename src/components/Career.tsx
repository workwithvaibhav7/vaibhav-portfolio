import { useEffect, useState } from "react";
import "./styles/Career.css";
import HoverLinks from "./HoverLinks";
import { supabase } from "../lib/supabase";

interface CareerItem {
  id: string;
  role: string;
  company: string;
  year: string;
  description: string;
  order_index: number;
}

const Career = () => {
  const [items, setItems] = useState<CareerItem[]>([]);

  useEffect(() => {
    const fetchCareer = async () => {
      const { data } = await supabase.from("career").select("*").order("order_index");
      if (data) setItems(data);
    };
    fetchCareer();
  }, []);

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
          {items.map((item) => (
            <div className="career-info-box" key={item.id}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.year}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <a className="career-resume title" href="#">
        <HoverLinks text="RESUME" />
      </a>
    </div>
  );
};

export default Career;
