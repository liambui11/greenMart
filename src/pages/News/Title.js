function Title({ title }) {
  return (
    <p
      className="parts-title__title"
      style={{
        fontWeight: 600,
        fontSize: "2.5rem",
      }}
    >
      {title}
    </p>
  );
}

export default Title;
