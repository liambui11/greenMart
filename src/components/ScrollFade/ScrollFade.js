import { useInView } from "react-intersection-observer";
import "./ScrollFade.css"; // chứa animation css

export default function ScrollFade({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.1, // bao nhiêu % xuất hiện thì kích hoạt
    triggerOnce: true, // chỉ animate lần đầu
  });

  return (
    <div ref={ref} className={`scroll-fade ${inView ? "visible" : ""}`}>
      {children}
    </div>
  );
}
