const SearchContainer = () => {
  return (
    <div class="search">
      <h2 class="contactsTitle">Contacts</h2>
      <form action="" class="searchForm">
        <label class="contact_input">
          <input type="text" name="input" id="input" />
          <label for="deploy-filter">
            <i class="arrow_down_display_filter fas fa-caret-down"></i>
          </label>
        </label>
        <input type="checkbox" name="close" id="close" />
        <div class="search_result">
          Argentina
          <label for="close">
            <i class="fas fa-times"></i>
          </label>
        </div>
        <input type="checkbox" id="deploy-filter" name="deploy-filter" />
        <button class="search_button">
          <i class="fas fa-search fa-lg"></i>
        </button>
        <div class="filter">
          <label for="contanctName">Contact name</label>
          <input
            type="text"
            id="contanctName"
            placeholder="Enter the contact name"
          />
          <label for="position"> Position </label>
          <input
            type="text"
            id="position"
            placeholder="Enter the contact position"
          />
          <label for="countryRegion">Country/Region</label>
          <select id="countryRegion">
            <option value="All">All</option>
            <option value="Argentina">Argentina</option>
            <option value="Colombia">Colombia</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Honduras">Honduras</option>
          </select>
          <label for="company"> Company </label>
          <select id="company">
            <option value="All">All</option>
            <option value="Argentina">Argentina</option>
            <option value="Colombia">Colombia</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Honduras">Honduras</option>
          </select>
          <label for="channel"> Preferred channel </label>
          <select id="channel">
            <option value="All">All</option>
            <option value="Argentina">Argentina</option>
            <option value="Colombia">Colombia</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Honduras">Honduras</option>
          </select>
          <label for="interest"> Interest </label>
          <select id="interest">
            <option value="All">All</option>
            <option value="Argentina">Argentina</option>
            <option value="Colombia">Colombia</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Honduras">Honduras</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
