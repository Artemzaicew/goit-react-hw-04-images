import { fetchImage } from 'components/services/getImage';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    dataImages: [],
    status: 'idle',
    page: 1,
    showButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const searchQuery = this.props.searchQuery;
    const page = this.props.page;
    
    if (prevSearchQuery !== searchQuery) {
      this.setState({ status: 'pending' });

      fetchImage(searchQuery, page)
        .then(response => {
          if (!response.ok) {
            toast('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.hits.length === 0) {
            toast(`No results found for "${searchQuery}"`);
            this.setState({ status: 'rejected' });
          } else {
            this.setState({ dataImages: data.hits, status: 'resolved' })
          };
        })
        .catch(error => this.setState({ status: 'rejected' }));
    }
  }

  showMoreImages = () => {
    const { searchQuery } = this.props;
    const nextPage = this.state.page + 1;
  
    fetchImage(searchQuery, nextPage)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          toast(`No more results found for "${searchQuery}"`);
          this.setState({showButton: false})
        } else {
          this.setState(prevState => ({
            dataImages: [...prevState.dataImages, ...data.hits],
            page: nextPage
          }));
        }
      })
      .catch(error => {
        toast('Error fetching more images');
      });
  };
  
  
  render() {
    const { dataImages, status, showButton } = this.state;
    const { showLargeImage } = this.props;
  
    if (status === 'pending') {
      return <TailSpin wrapperClass={css.spiner} color="blue" />;
    }
  
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {dataImages &&
              dataImages.map(el => (
                <ImageGalleryItem
                  className={css.ImageGalleryItem}
                  key={el.id}
                  imageInfo={el}
                  showLargeImage={showLargeImage}
                />
              ))}
          </ul>
          <Button onClick={this.showMoreImages} showButton={showButton} />
        </>
      );
    }
  }
}
