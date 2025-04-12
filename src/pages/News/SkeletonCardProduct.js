import "./SkeletonCardProduct.css";

function SkeletonCardProduct() {
  return (
    <div className="skeleton-card-container">
      <div className="skeleton-card">
        <div className="skeleton skeleton-img" />
        <div className="skeleton skeleton-name" />
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-button" />
      </div>
    </div>
  );
}

export default SkeletonCardProduct;
