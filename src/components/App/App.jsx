import { Component } from 'react';

import { fetchImages } from 'services/images-api';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { Searchbar } from 'components/Searchbar';
import { Loader } from 'components/Loader';

import { Container, Image, LoadButton } from './App.styled';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component {
  state = {
    search: '',
    showModal: false,
    largeImage: '',
    alt: '',
    images: [],
    page: 1,
    status: STATUS.idle,
    error: null,
	 total:0,
  };

  componentDidUpdate(prevProps, prevState) {
	const { search, page } = this.state;

	if (prevState.search !== search || prevState.page !==page) {
	  this.updateImages();
	}
 }

 loadMore = () => {
	this.setState(
	  prevState => ({
		 page: prevState.page + 1,
	  }),
	);
 };

  updateImages = async () => {
    const { page, search } = this.state;

    if (!search) return;

    this.setState({ status: STATUS.pending });

    try {
      const images = await fetchImages(search, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: STATUS.resolved,
		  total: images.length,
      }));

      console.log(this.state);
    } catch (error) {
      this.setState({ status: STATUS.rejected, error });
    }
  };

  onImageClick = (largeImage, alt) => {
    this.setState({ largeImage, alt, showModal: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onSubmit = search => {
    this.setState({ search: search.trim(), images: [], page: 1 });
  };

  render() {
    const { showModal, largeImage, alt, images, status, error, total } = this.state;

    if (status === STATUS.rejected) {
      return <div>{error.message}</div>;
    }

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.onSubmit} />

          <ImageGallery images={images} onClick={this.onImageClick} />
        </Container>

        {showModal && (
          <Modal src={largeImage} alt={alt} onClose={this.toggleModal}>
            <Image src={largeImage} alt={alt} />
          </Modal>
        )}

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
