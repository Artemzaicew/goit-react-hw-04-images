import { useState } from 'react';
import css from './App.module.css';
import { Component } from 'react';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import { ButtonClose } from './ButtonClose/ButtonClose';

export default function App() {

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImageURL, setLargeImageUrl] = useState('');
  const [alt, setAlt] = useState('');

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal)
  };

 const  handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const showLargeImage = (largeImageURL, alt) => {
    setLargeImageUrl(largeImageURL);
    setAlt(alt);
    toggleModal();
  };

    return (
      <div className={css.app}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          showLargeImage={showLargeImage}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={alt} />
            <ButtonClose onClick={toggleModal}/>
          </Modal>
        )}
      </div>
    );
  
}

// import React from 'react';
// import css from './App.module.css';
// import { Component } from 'react';
// import { Modal } from './Modal/Modal';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ButtonClose } from './ButtonClose/ButtonClose';

// export class App extends Component {
//   state = {
//     showModal: false,
//     searchQuery: '',
//     largeImageURL: '',
//     alt: '',
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   showLargeImage = (largeImageURL, alt) => {
//     this.setState({ largeImageURL, alt });
//     this.toggleModal();
//   };

//   render() {
//     const { showModal, searchQuery, largeImageURL, alt } = this.state;
//     const { handleFormSubmit, showLargeImage, toggleModal, } = this;

//     return (
//       <div className={css.app}>
//         <ToastContainer autoClose={3000} />
//         <Searchbar onSubmit={handleFormSubmit} />
//         <ImageGallery
//           searchQuery={searchQuery}
//           showLargeImage={showLargeImage}
//         />
//         {showModal && (
//           <Modal onClose={toggleModal}>
//             <img src={largeImageURL} alt={alt} />
//             <ButtonClose onClick={toggleModal}/>
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
