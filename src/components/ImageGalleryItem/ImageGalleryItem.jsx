import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { smallImage, largeImage, alt } = this.props;
    return (
      <>
        <GalleryItem>
          <GalleryImage
            src={smallImage}
            alt={alt}
            onClick={this.toggleModal}
          ></GalleryImage>
        </GalleryItem>
        {showModal && (
          <Modal src={largeImage} alt={alt} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
