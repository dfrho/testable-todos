import React from 'react';
import { mount} from 'enzyme';
import App from './App';

describe('App component', () => {

    let app = mount(<App />)

    it('renders the h1', () => {
        expect(app.find('h1').text()).toEqual('Note to Self');
    });

    it('renders the clear notes button', () => {
        expect(app.find('button').at(1).text()).toEqual('Clear Notes');
    });

    describe('renders the form correctly', () => {
        it('with the form component', () => {
            expect(app.find('Form').exists());
        });

        it('with the form control component', () => {
            expect(app.find('FormControl').exists());
        });

        it('with the form submit button', () => {
            expect(app.find('button').at(0).text()).toEqual('Submit');
        });
    });

    describe('when creating a note', () => {
        let testNote = 'test note';

        beforeEach(() => {
            app.find('FormControl').simulate('change', {
                target: {value: testNote}
            })
        });

        it('it updates the text in state', () => {
            expect(app.state().text).toEqual(testNote);
        });

        describe('and when clicking submit it adds note to state', () => {
            beforeEach(() => {
                app.find('button').at(0).simulate('click');
            });

            afterEach(()=>{
                app.find('button').at(1).simulate('click');
            })


            it('it adds the new note to state', () => {
                expect(app.state().notes[0].text).toEqual(testNote);
            });

            describe('and remounts the component', () => {
                let app2;

                beforeEach(()=> {
                    app2 = mount(<App/>);
                });

                it('while reading the stored note cookies', () => {
                    expect(app2.state().notes).toEqual([{text: testNote}]);
                })
            })

            describe('and clicking the clear button', () => {
                beforeEach(()=> {
                    app.find('button').at(1).simulate('click');
                });

                it('clears the note in state', () => {
                    expect(app.state().notes).toEqual([]);
                });
            });
        });
    });



});
