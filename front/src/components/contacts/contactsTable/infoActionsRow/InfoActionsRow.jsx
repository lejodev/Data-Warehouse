function InfoActionsRow() {
    return (
        <div className="info_action_row">
            <div className="selected_amount"></div>
            <div className="delete_contacts">
              <i className="fas fa-trash"></i>
              <span>Delete contacts</span>
            </div>
          </div>
    )
}

export default InfoActionsRow;