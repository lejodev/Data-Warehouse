function ContactRow() {
  return (
    <div className="row">
      <div className="checkbox_row col">
        <input type="checkbox" name="" id="select" className="select" />
      </div>
      <div className="contact_row">
        <div className="contact_photo_name_email_container">
          <div className="photo"></div>
          <span className="name">...</span>
          <span className="email">...</span>
        </div>
      </div>
      <div className="country_region_row">
        <span className="country">...</span>
        <span className="region">...</span>
      </div>
      <div className="company_row">
        <span className="company">...</span>
      </div>

      <div className="position_row">
        <span className="position">Position</span>
      </div>

      <div className="preferred_channel_row">
        <div className="preferred_channels_container">
          <div className="channel">WhatsApp</div>
          <div className="channel">Facebook</div>
        </div>
      </div>

      <div className="interest_row">
        <div className="bar">
          <div className="percentage"></div>
        </div>
      </div>

      <div className="actions_row">
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
  );
}

export default ContactRow;