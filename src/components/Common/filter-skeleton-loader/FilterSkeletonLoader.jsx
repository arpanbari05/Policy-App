import "./filterskeleton.scss";

const FilterSkeletonLoader = () => {
  return (
    <div className="card">
      <div className="card__title loading" />
      <div className="card__description loading" />
    </div>
  );
};

export default FilterSkeletonLoader;
