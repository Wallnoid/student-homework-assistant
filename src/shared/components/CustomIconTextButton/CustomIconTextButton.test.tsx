import React from 'react';
import { render } from '@testing-library/react';
import CustomIconTextButton from './CustomIconTextButton';
import { describe, it } from 'node:test';
import { expect } from '@storybook/test';

describe('CustomIconTextButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomIconTextButton children={<div>Test</div>} text="Test" onClick={() => { }} />);

        expect(baseElement).toBeTruthy();
    });
});