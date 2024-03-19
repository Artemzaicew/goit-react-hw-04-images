import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';

export default function Searchbar (props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast('Please enter a search query!');
      return;
    }
    props.onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <div className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            name="searchQuery"
            value={searchQuery}
            onChange={handleNameChange}
            placeholder="Search images and photos"
          />
          <button className={css.searchFormButton} type="submit">
            <IoSearch className={css.buttonIcons} />
          </button>
        </form>
      </div>
    );
}
