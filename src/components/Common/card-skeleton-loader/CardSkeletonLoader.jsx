import "./cardskeleton.scss";
const CardSkeletonLoader = ({ noOfCards = 1 }) =>
  Array(noOfCards)
    .fill("-")
    .map((_, i) => (
      <div id="u_0_v" key={i}>
        <div className="lightui1">
          <div className="lightui1-shimmer">
            <div className="_2iwr"></div>
            <div className="_2iws"></div>
            <div className="_2iwt"></div>
            <div className="_2iwu"></div>
            <div className="_2iwv"></div>
            <div className="_2iww"></div>
            <div className="_2iwx"></div>
            <div className="_2iwy"></div>
            <div className="_2iwz"></div>
            <div className="_2iw-"></div>
            <div className="_2iw_"></div>
            <div className="_2ix0"></div>
          </div>
        </div>
      </div>
    ));

export default CardSkeletonLoader;
