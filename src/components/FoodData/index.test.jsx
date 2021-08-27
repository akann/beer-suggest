import React from 'react';
import ReactDOM from 'react-dom';

import {mount} from 'enzyme';

import FoodData from './';

describe('FoodData', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FoodData />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render correct number of rows', () => {
    const data = [
      {
        name: 'Jasmine IPA',
        description: 'data1',
        firstBrewed: '03/2014'
      },
      {
        name: 'Another IPA',
        description: 'data2',
        firstBrewed: '03/2014'
      }
    ]
    const wrapper = mount(<FoodData data={data} />);
    
    expect(wrapper.find('tbody tr').length).toEqual(2);
  });

});

