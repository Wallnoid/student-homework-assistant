import React from 'react';
import { render } from '@testing-library/react';
import CustomColorPicker from './CustomColorPicker';

describe('CustomColorPicker', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomColorPicker />);

        expect(baseElement).toBeTruthy();
    });
});