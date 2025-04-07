function ShopNowButton({ link = "#!" }) {
  const styles = {
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    padding: "1.3rem 1.8rem 1.3rem 2rem",
    borderRadius: "0.75rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "1.5rem"
  };

  return (
    <a href={link} style={styles}>
      Shop Now{" "}
      <i
        className="fa-solid fa-arrow-right"
        style={{ paddingLeft: "0.7rem" }}
      ></i>
    </a>
  );
}

export default ShopNowButton;
