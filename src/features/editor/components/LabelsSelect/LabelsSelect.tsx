"use client";
import React, { useState } from 'react';

import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

interface Label {
	id: number;
	name: string;
}

export type LabelsSelectProps = {
	// types...
}

const LabelsSelect: React.FC<LabelsSelectProps> = ({ }) => {

	const [isOpen, setIsOpen] = useState(false);


	const labels = [
		{ id: 1, name: 'Label 1' },
		{ id: 2, name: 'Label 2' },
		{ id: 3, name: 'Label 3' },
		{ id: 4, name: 'Label 4' },
		{ id: 5, name: 'Label 5' },
	];

	const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);



	const handleLabelClick = (label: Label) => {
		if (selectedLabels.some((l) => l.id === label.id)) {
			setSelectedLabels(selectedLabels.filter((l) => l.id !== label.id));
		} else {
			setSelectedLabels([...selectedLabels, label]);
		}
	};


	const handleIsOpen = () => {
		console.log('isOpen', isOpen);
		setIsOpen(!isOpen);

	}

	return (

		<Menu
			open={isOpen}
			handler={handleIsOpen}

		>
			<MenuHandler
			>


				<div

					className={`flex flex-row gap-2 h-full rounded-lg  hover:bg-gray-200  py-1 px-2 items-center col-span-5 cursor-pointer ${isOpen ? 'bg-gray-200' : ''}`}
				>


					{
						selectedLabels.length === 0 ? (
							<span className="text-gray-500 text-sm">Selecciona las etiquetas</span>
						) : (
							<span className="text-gray-600 text-sm">{selectedLabels.length} Etiquetas Seleccionadas</span>
						)
					}



					{selectedLabels.map((label) => (
						<div key={label.id} className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-xs">
							{label.name}
						</div>
					))}



				</div>
			</MenuHandler>
			<MenuList>
				{labels.map((label) => (
					<MenuItem key={label.id} onClick={() => handleLabelClick(label)} className={`flex items-center gap-2 ${selectedLabels.some((l) => l.id === label.id) ? '' : ''}`}>
						<input type="checkbox" checked={selectedLabels.some((l) => l.id === label.id)} readOnly className="mr-2" />
						{label.name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>


	);
};

export default LabelsSelect;
