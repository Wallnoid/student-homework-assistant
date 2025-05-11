import React from 'react';
import { render } from '@testing-library/react';
import InputIAForEditor from './InputIAForEditor';

describe('InputIAForEditor', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<InputIAForEditor />);

        expect(baseElement).toBeTruthy();
    });
});