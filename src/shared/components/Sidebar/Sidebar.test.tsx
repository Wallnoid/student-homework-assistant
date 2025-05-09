import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import { describe, it } from 'node:test';
import { expect } from '@storybook/test';

describe('Sidebar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Sidebar />);

        expect(baseElement).toBeTruthy();
    });
});