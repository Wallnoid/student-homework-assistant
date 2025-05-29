"use client";
import React, { useState } from 'react';

import { Collapse, Input, List, ListItem, Popover, PopoverContent, PopoverHandler, Typography } from "@material-tailwind/react";
import { useTags } from '@/shared/hooks/useTags.hook';
import { CustomButton } from '../CustomButton';
import { NoteTag } from '@/shared/models/tag.model';
import { CustomColorPicker } from '../CustomColorPicker';
import { EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { isDarkColor } from '@/shared/utils/colors.utils';
import { useFormTags } from '@/shared/hooks/useFormTags.hooks';



export type TagDropdownProps = {
	// types...
}

const TagDropdown: React.FC<TagDropdownProps> = ({ }) => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedTags, setSelectedTags] = useState<NoteTag[]>([]);

	const { tags, isLoading, error, refresh, setRefresh } = useTags();

	const { name, color, showTagForm, handleSubmit, handleShowTagForm, handleColorChange, handleNameChange, isLoading: isLoadingForm, fillForm, isEditing, handleSetShowTagForm, clearForm, handleDeleteTag } = useFormTags({ refresh: () => setRefresh(true) });


	const handleTagClick = (tag: NoteTag) => {
		if (selectedTags.some((t) => t.id === tag.id)) {
			setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};


	const handleEditTag = (e: React.MouseEvent, tag: NoteTag) => {
		console.log(tag)
		e.stopPropagation()
		fillForm(tag);
		handleSetShowTagForm(true);
	}


	return (

		<Popover
		// dismiss={{
		// 	itemPress: false,
		// }}

		>
			<PopoverHandler
				onClick={() => handleSetShowTagForm(false)}

			>
				<div
					className={`flex flex-row gap-2 h-full rounded-lg   hover:bg-gray-200  py-1 px-2 items-center col-span-5 cursor-pointer ${isOpen ? 'bg-gray-200' : ''}`}
				>


					{
						selectedTags.length === 0 ? (
							<span className="text-gray-500 text-sm">Selecciona las etiquetas</span>
						) : null
					}



					{selectedTags.map((tag) => (
						<div key={tag.id} style={{ backgroundColor: tag.color }} className={` font-semibold ${isDarkColor(tag.color) ? 'text-white ' : 'text-gray-700 '}  px-2 py-0.5 rounded-md text-xs`}>
							{tag.name}
						</div>
					))}



				</div>
			</PopoverHandler>
			<PopoverContent className='w-72 max-h-[500px] overflow-y-auto overflow-x-hidden '>

				<div className={`flex flex-col gap-2 items-center justify-between ${showTagForm ? 'mb-5' : ''}`}>

					<div className='w-full flex items-start'>

						<Typography variant="h6" className="text-gray-500">Etiquetas</Typography>
					</div>
					<CustomButton
						label={showTagForm ? 'Cancelar' : 'Agregar Etiqueta'}
						onClick={() => {
							handleShowTagForm()
							if (!showTagForm) {
								clearForm()
							}
						}}
						size='sm'
					/>
				</div>


				<Collapse open={showTagForm}>


					{isEditing && (
						<div onClick={() => handleDeleteTag()} className='w-full flex items-center hover:bg-red-100 duration-500  justify-start p-2 rounded-md my-2 cursor-pointer gap-2 group'>

							<TrashIcon className='w-4 h-4 text-primary duration-500' />
							<span className='text-primary duration-500 font-medium'>Eliminar Etiqueta</span>
						</div>
					)}


					<div className="flex gap-2 py-2">

						<Popover placement="bottom">
							<PopoverHandler>
								<div className='w-full flex flex-col gap-2 justify-center items-center bg-gray-100 rounded-md p-1 '>
									<span className='rounded-full size-5 ' style={{ backgroundColor: color }} />
								</div>
							</PopoverHandler>
							<PopoverContent className="w-fit">

								<CustomColorPicker onChange={handleColorChange} initialColor={color} />

							</PopoverContent>
						</Popover>
						<Input

							label="Label"
							value={name}
							onChange={(e) => handleNameChange(e.target.value)}
						/>



					</div>


					<div className='w-full flex flex-col gap-2 mt-3'>
						<CustomButton size='sm' label={isEditing ? 'Editar' : 'Agregar'} onClick={handleSubmit} loading={isLoadingForm} />
					</div>

				</Collapse>


				<hr className="my-5 border-blue-gray-50" />


				<List>


					{tags.map((tag: NoteTag) => (
						<ListItem
							key={tag.id} onClick={() => handleTagClick(tag)} className={`flex items-center justify-between py-0.5 gap-0`}>

							<div className='relative w-fit px-2 py-0.5 h-fit flex items-center justify-center rounded-sm' style={{ backgroundColor: tag.color }}>
								<div className='absolute top-0 left-0 w-full h-full bg-black/5 rounded-md'></div>

								<span className={`${isDarkColor(tag.color) ? 'text-white' : 'text-gray-700'} font-semibold text-xs`}>{tag.name}</span>
							</div>

							<div onClick={(e) => handleEditTag(e, tag)} className='flex items-center justify-center p-2 rounded-md hover:bg-gray-300 duration-500 cursor-pointer'>
								<EllipsisHorizontalIcon className='w-4 h-4' />
							</div>



							{/* <CustomIconButton size='sm' variant='text' backgroundColor="black" onClick={() => handleEditTag(tag)} >

							<EllipsisHorizontalIcon className='w-4 h-4' />
						</CustomIconButton> */}

						</ListItem>
					))}
				</List>



			</PopoverContent>
		</Popover>




	);
};

export default TagDropdown;
