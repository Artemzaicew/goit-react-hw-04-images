import css from "./ImageGalleryItem.module.css"

export function ImageGalleryItem({imageInfo, showLargeImage, onClick}) {
    const { webformatURL, tags: alt, largeImageURL } = imageInfo;
    return (
        <li onClick={() => {
            showLargeImage(largeImageURL, alt);
          }}>
            <img className={css.ImageGalleryItemImage} src={webformatURL} alt={alt} />   
        </li>
    )
    }
