function CleaningMascot() {
  return (
    <div className="cleaner-wrapper">
      <div className="cleaner-shadow"></div>

      <div className="cleaner-character">
        <div className="hair"></div>
        <div className="head">
          <div className="eye left"></div>
          <div className="eye right"></div>
          <div className="smile"></div>
        </div>

        <div className="body">
          <div className="arm left-arm"></div>
          <div className="arm right-arm">
            <div className="mop-stick"></div>
          </div>
        </div>

        <div className="legs">
          <div className="leg"></div>
          <div className="leg"></div>
        </div>
      </div>
    </div>
  );
}

export default CleaningMascot;