import React from 'react';
import { render } from '@testing-library/react';
import InputForEditor from './InputForEditor';

describe('InputForEditor', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<InputForEditor />);

        expect(baseElement).toBeTruthy();
    });
});