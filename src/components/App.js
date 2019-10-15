import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const cookie_key = 'NOTES';


class App extends Component {
  constructor () {
    super();

    this.state = {
      text: '',
      notes: []
    };
  }

  componentDidMount() {
    this.setState({ notes: read_cookie(cookie_key) });
  }




  onSubmit (event) {
    event.preventDefault();
    const { notes, text } = this.state;
    const newNote = { text };
    notes.push(newNote);

    this.setState({ notes });

    bake_cookie(cookie_key, this.state.notes);
  }

  onClear() {
    delete_cookie(cookie_key)
    this.setState({notes: []})
  }

  render () {
    return (
      <div>
        <h1>Note to Self</h1>
        <Form inline>
          <FormControl
            onChange={event => {
              this.setState({ text: event.target.value });
            }}
          />{' '}
          <Button onClick={e => this.onSubmit(e)}>Submit</Button>
        </Form>
        {this.state.notes.map((note, index) => {
          return (
            <Note key={index} note={note}/>
          );
        })}
        <hr/>
        <Button onClick={() => this.onClear()}>Clear Notes</Button>
      </div>
    );
  }
}

export default App;
