import React from 'react';


class SelectWithSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
      isOpen: false,
    };
  }

  handleChangeSearch = (e) => {
    this.setState({ inputSearch: e.target.value }, () => {
      this.props.searchFunction(this.state.inputSearch);
    });
  };

  handleToggleDropdown = (e) => {
    console.log('click')
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleCloseDropdown = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: false });
  };

  preventClosing = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  handleSelectOption = (e) => {
    const id = e.target.id;
    let result;
    this.props.options.forEach((item) => {
      if (item.value === id) {
        result = item;
      }
    });

    this.props.handleChange(result)
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    document.addEventListener('click', this.handleCloseDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseDropdown);
  }

  render() {
    return (
      <div className="select-with-search">
        {this.props.label && <div className="select-with-search__label">
          {this.props.label}
        </div>}
        <div className="select-with-search__dropdown-container">
          <div
            onClick={this.handleToggleDropdown}
            className="select-with-search__dropdown-value"
          >
            {this.props.value ? this.props.value.title : this.props.hint}
            <div className={this.state.isOpen ? 'select-with-search__arrow select-with-search__arrow--inverse' : 'select-with-search__arrow'} />
          </div>
          {this.state.isOpen && <div
            className="select-with-search__dropdown-menu"
            onClick={this.preventClosing}
          >
            <input
              className="select-with-search__input"
              value={this.state.inputSearch}
              onChange={this.handleChangeSearch}
              placeholder="Start typing"
            />
            {this.props.options.length === 0 && <div
              className="select-with-search__nothing-found"
            >
              Nothing found
            </div>}
            {this.props.options && this.props.options.length > 0 && <div
              className="select-with-search__options-container"
            >
              {this.props.options.map((item) => {
                return (
                  <div
                    className={
                      this.props.value && (this.props.value.value === item.value) ?
                      'select-with-search__options-item select-with-search__options-item--active' :
                      'select-with-search__options-item'
                    }
                    id={item.value}
                    key={item.value}
                    onClick={this.handleSelectOption}
                  >
                    {item.title}
                  </div>
                )
              })}
            </div>}

          </div>}
        </div>




      </div>
    );
  }
}

export default SelectWithSearch;
