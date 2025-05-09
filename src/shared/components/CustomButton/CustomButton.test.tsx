import React from 'react';
import { render } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomButton />);

        expect(baseElement).toBeTruthy();
    });
});