import React from "react";

const Loader = () => {
  return (
    <section>
      <div id="preloader">
        <div id="ctn-preloader" className="ctn-preloader">
          <div className="animation-preloader">
            <div className="spinner"></div>
            <div className="txt-loading">
              <span data-text-preloader="F" className="letters-loading">
                F
              </span>
              <span data-text-preloader="Y" className="letters-loading">
                Y
              </span>
              <span data-text-preloader="N" className="letters-loading">
                N
              </span>
              <span data-text-preloader="T" className="letters-loading">
                T
              </span>
              <span data-text-preloader="U" className="letters-loading">
                U
              </span>
              <span data-text-preloader="N" className="letters-loading">
                N
              </span>
              <span data-text-preloader="E" className="letters-loading">
                E
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
