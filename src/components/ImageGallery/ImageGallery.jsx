import { fetchImage } from 'components/services/getImage';
import { useEffect, useState } from 'react';
import css from './ImageGallery.module.css';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

export default function ImageGallery(props) {
  const { searchQuery, page } = props;
  const [dataImages, setDataImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showButton, setShowButton] = useState(false);
    
  useEffect(()=>{
    if (!searchQuery) 
    return
    
    setStatus('pending');

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
            setStatus('rejected');
          } else {
            setDataImages(data.hits);
            setStatus('resolved');
          };
        })
        .catch(error => setStatus('rejected'));
  },[searchQuery, page])


  const showMoreImages = () => {
    const nextPage = page + 1;
  
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
          setShowButton(false)
        } else {
          setDataImages(prevDataImages => [...prevDataImages, ...data.hits]);
          props.setPage(nextPage);
        }
      })
      .catch(error => {
        toast('Error fetching more images');
      });
  };
  
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
                  showLargeImage={props.showLargeImage}
                />
              ))}
          </ul>
          <Button onClick={showMoreImages} showButton={showButton} />
        </>
      );
    }
  }
