import React from 'react';
import { render } from '@testing-library/react';
import LabelsSelect from './LabelsSelect';

describe('LabelsSelect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<LabelsSelect />);

        expect(baseElement).toBeTruthy();
    });
});