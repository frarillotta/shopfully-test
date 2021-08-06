import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MultiselectIcon } from '../SVGs/MultiselectIcon';
import { Delete } from '../SVGs/Delete';

type DropdownSelectProps = {
	defaultValue: string;
	list: string[];
	setFilter: (filters: string[]) => void;
}

export const DropdownMultiSelect = memo(({defaultValue = '', list, setFilter}: DropdownSelectProps) => {

	const [currentSelection, setCurrentSelection] = useState<string[]>([]);
	const dropdownEl = useRef<Element>();

	const [isExpanded, setIsExpanded] = useState(false);

	const handleEvent = (e) => {
		if (dropdownEl.current?.contains(e.target)) return;
		setIsExpanded(!isExpanded);
	};

	useEffect(()=>{
		setFilter(currentSelection);
	}, [currentSelection]);

	const handleCheckboxClick = (event) => {
		const val = event.target.value;
		const elToRemoveIndex = currentSelection.indexOf(String(val));
		const selectCopy = [...currentSelection];
		if (elToRemoveIndex > -1) {
			selectCopy.splice(elToRemoveIndex, 1);
		} else {
			selectCopy.push(val);
		}
		setCurrentSelection(selectCopy);
	};

	useEffect(()=>{
		if(isExpanded) {
			document.addEventListener('mousedown', handleEvent, false);
			document.addEventListener('touchend', handleEvent, false);
			document.addEventListener('keyup', (e) => {if (e.code === 'Escape') setIsExpanded(false);});
		}
		return () => {
		  document.removeEventListener('mousedown', handleEvent, false);
		  document.removeEventListener('touchend', handleEvent, false);
		  document.removeEventListener('keyup', (e) => {if (e.code === 'Escape') setIsExpanded(false);});
		};
	});

	return <Wrapper ref={dropdownEl}>
		<MultiselectButton tabIndex='0' onClick={() => setIsExpanded(!isExpanded)}>
			<CurrentSelection>{
				currentSelection.length > 0 
					? currentSelection.reduce( (accumulator, selection, index) => {
						return `${accumulator}${index > 0 ? ',' : ''} ${selection}`;
					}, '') 
					: defaultValue
			}</CurrentSelection>
			{currentSelection.length > 0 ? <DeleteIcon type='button' onClick={() => setCurrentSelection([])}><Delete/></DeleteIcon> : <DropdownIcon/>}
		</MultiselectButton>
		{isExpanded && <DropdownMenu>
			{list.map((val: string) => 
				<SelectOption key={val}>
					<FormWrapper>
						<FormLabel>{val}</FormLabel>
						<FormCheckbox checked={currentSelection.includes(val)} onChange={handleCheckboxClick} type={'checkbox'} value={val}/>
					</FormWrapper>
				</SelectOption>
			)}
		</DropdownMenu>}
	</Wrapper>;

});

DropdownMultiSelect.displayName = 'DropdownSelect';


const Wrapper = styled.form`
	position: relative;
	display: inline-flex;
	vertical-align: middle;
	height: 54px;
	min-width: 80px;
	flex-grow: 0;
	border-radius: .25rem;
	width: 100%;
	box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
`;

const MultiselectButton = styled.fieldset`
    text-rendering: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	padding: 16px 8px 16px 16px;
	border-radius: .25rem;
	appearance: none;
	min-width: 0;
	background: white;
	&:focus {
		border: 2px solid blue;
		padding: 14px 6px 14px 14px;
	}
	&:focus-visible {
		border: 2px solid blue;
		padding: 14px 6px 14px 14px;
	}
`;

const DropdownIcon = styled(MultiselectIcon)`
	cursor: pointer;
	fill: rgba(0, 0, 0, 0.54);
`;
const DeleteIcon = styled.button`
	cursor: pointer;
	margin: 3px 3px 0px 5px;
	background: white;
	fill: rgba(0, 0, 0, 0.54);
`;

const CurrentSelection = styled.label`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1 1 0;
    min-width: 0;
`;

const DropdownMenu = styled.div`
	z-index: 2;
	position: absolute;
	transform: translate3d(0px, 52px, 0px);
	box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
	top: 0px;
	left: 0px;
	will-change: transform;
	float: left;
	min-width: 10rem;
	text-align: left;
	border: 1px solid rgba(0,0,0,.15);
	border-radius: .25rem;
	background: white;
	max-height: 500px;
	overflow-y: auto;
	padding-left: 0.75rem;
	& > * + * {
		border-top: 1px solid #d8d8d8 !important
	}
`;

const SelectOption = styled.div`
	padding: 1rem 0.75rem 1rem 0px;
	width: 100%;
	display: block;
	background: white;
	clear: both;
	white-space: nowrap;
	text-align: inherit;
	border: 0;
`;

const FormWrapper = styled.span`
	padding: 0 88px 0 5px;
	position: relative;
	display: block;
`;

const FormCheckbox = styled.input`
	cursor: pointer;
	position: absolute;
	margin-left: -1.25rem;
	margin-top: 1px;
	overflow: visible;
	right: 0px;
	height: 1rem;
	width: 1rem;
`;

const FormLabel = styled.label`
    
`;