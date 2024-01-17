import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { Content, Image, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = event => {
    const ESC = 'Escape';

    if (event.code === ESC) {
      this.props.onClose();
    }
  };

  closeModal = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.closeModal}>
        <Content>
          <Image src={src} alt={alt} />
        </Content>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
