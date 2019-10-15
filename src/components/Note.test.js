import React from 'react';
import { mount} from 'enzyme';
import Note from './Note';

describe('Note', () => {
    let props = {note: {text: 'dude'}}
    let note = mount(<Note {...props}/>)

    it('renders the note text', () => {
        expect(note.find('p').text()).toEqual(props.note.text);
    });


});
