import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader';

import { fetchImages } from 'services/images-api';

import { GalleryList, LoadButton } from './ImageGallery.styled';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: STATUS.idle,
    error: null,
	 total:0,
  };

  async componentDidUpdate(prevProps) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch !== nextSearch) {
      this.setState({ images: [], page: 1 }, this.updateImages);
    }
  }

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.updateImages
    );
  };

  updateImages = async () => {
    const { search } = this.props;
    const { page } = this.state;
    this.setState({ status: STATUS.pending });

    try {
      const images = await fetchImages(search, page);
      console.log (images.length);
		this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: STATUS.resolved,
		  total: images.length,
      }));
    } catch (error) {
      this.setState({ status: STATUS.rejected, error });
    }
  };

  render() {
    const { images, status, error, total } = this.state;

    if (status === STATUS.idle) {
      return <div></div>;
    }

    if (status === STATUS.rejected) {
      return <div>{error.message}</div>;
    }

    return (
      <>
        <GalleryList>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              alt={tags}
            />
          ))}
        </GalleryList>

        {status === STATUS.pending && <Loader />}

        {status !== STATUS.rejected && total > 0 && (
          <LoadButton type="button" onClick={this.loadMore}>
            Load more
          </LoadButton>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
