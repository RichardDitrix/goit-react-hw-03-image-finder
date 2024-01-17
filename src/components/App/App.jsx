import { Component } from 'react';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    search: '',
  };

  onSubmit = search => {
    this.setState({ search: search.trim() });
  };

  render() {
    const { search } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery search={search} />
      </Container>
    );
  }
}
