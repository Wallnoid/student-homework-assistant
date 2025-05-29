import React from 'react';
import { render } from '@testing-library/react';
import CustomAdminNavBar from './CustomAdminNavBar';

describe('CustomAdminNavBar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomAdminNavBar />);

        expect(baseElement).toBeTruthy();
    });
});