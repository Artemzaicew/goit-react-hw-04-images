import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast('Please enter a search query!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
          <button className={css.searchFormButton} type="submit">
            <IoSearch className={css.buttonIcons} />
          </button>
        </form>
      </div>
    );
  }
}
