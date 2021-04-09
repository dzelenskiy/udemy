import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// adding and using named export to bypass redux
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// connects Enzyme
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should not render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingredients: null});
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});