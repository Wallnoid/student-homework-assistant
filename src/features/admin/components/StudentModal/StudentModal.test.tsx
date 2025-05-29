import React from 'react';
import { render } from '@testing-library/react';
import StudentModal from './StudentModal';

describe('StudentModal', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<StudentModal />);

        expect(baseElement).toBeTruthy();
    });
});