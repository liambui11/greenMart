import { useNavigate } from "react-router-dom";

function ShopNowButton({ link = "#!" }) {
  const styles = {
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    padding: "1rem 1.5rem 1rem 1.6rem",
    borderRadius: "0.75rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "1.5rem",
  };

  const navigate = useNavigate();
  return (
    <a
      href={link}
      style={styles}
      onClick={() => navigate(`/productdetail/keto-chocolate-ice-cream`)}
    >
      Shop Now{" "}
      <i
        className="fa-solid fa-arrow-right"
        style={{ paddingLeft: "0.7rem" }}
      ></i>
    </a>
  );
}

export default ShopNowButton;
