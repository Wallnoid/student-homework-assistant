import React from 'react';
import { render } from '@testing-library/react';
import CustomIconButton from './CustomIconButton';

describe('CustomIconButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomIconButton />);

        expect(baseElement).toBeTruthy();
    });
});