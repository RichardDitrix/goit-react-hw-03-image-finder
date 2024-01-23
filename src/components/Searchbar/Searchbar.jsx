import { Component } from 'react';

import { Button, Form, Header, ButtonLabel, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  onSearchChange = event => {
    const search = event.target.value;
    this.setState({ search });
  };

  onSearch = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <Header>
        <Form className="form" onSubmit={this.onSearch}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.onSearchChange}
          />
        </Form>
      </Header>
    );
  }
}
