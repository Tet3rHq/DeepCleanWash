function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-icon premium-clean-icon">
        <span className="bubble bubble-one"></span>
        <span className="bubble bubble-two"></span>
        <span className="sparkle sparkle-one">✦</span>
        <span className="sparkle sparkle-two">✧</span>
        <span className="clean-drop"></span>
      </div>

      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <strong>KES {service.base_price}</strong>
    </div>
  );
}

export default ServiceCard;