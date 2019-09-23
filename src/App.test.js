import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';

import {mount} from 'enzyme';

import App from './App';
import DataError from './components/DataError';

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render data with meal text', () => {
    const div = document.createElement('div');

    const fetchDataSpy = jest.fn(() => Promise.resolve([
      {name: 'name1', description: 'text1', firstBrewed: '09/2011'}
    ]));
    
    ReactDOM.render(<App fetchData={fetchDataSpy} />, div);
    ReactDOM.unmountComponentAtNode(div);  });

  it('should render error with empty meal text', () => {
    const fetchDataSpy = jest.fn(() => []);
    const wrapper = mount(<App fetchData={fetchDataSpy} />);

    expect(wrapper.find(DataError).length).toEqual(0);
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(DataError).length).toEqual(1);
  });

});

