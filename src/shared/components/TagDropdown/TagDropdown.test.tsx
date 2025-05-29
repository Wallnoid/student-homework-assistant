import React from 'react';
import { render } from '@testing-library/react';
import TagDropdown from './TagDropdown';

describe('TagDropdown', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TagDropdown />);

        expect(baseElement).toBeTruthy();
    });
});