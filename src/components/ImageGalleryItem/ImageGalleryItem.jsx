import PropTypes from 'prop-types';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, alt, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={smallImage}
        alt={alt}
        onClick={() => onClick(largeImage, alt)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
