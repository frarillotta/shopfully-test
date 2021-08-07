import { debounce } from '../../utils';
import styled from 'styled-components';
import { Search } from '../SVGs/Search';
import { useMemo } from 'react';

type SearchInputProps = {
	queries: string[],
	label: string,
	setQuery: (val: string) => void
}

export function SearchInput({queries = [], label, setQuery}: SearchInputProps) {

	const handleChange = (event) => {
		setQuery(event[0].target.value);
	};

	const debouncedChangeHandler = useMemo(
		() => debounce(handleChange, 300)
		, []);

	return (<>
		<Wrapper>
			<InputWrapper>
				<Icon/>
				<datalist id='searchQueries'>
					{queries.map((query) => <option key={query} value={query}/>)}
				</datalist>
				<Input onChange={debouncedChangeHandler} placeholder={label} type='search' list='searchQueries'/>
			</InputWrapper>
		</Wrapper>
	</>);

}

const Wrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.09);
	width: 100%;
	height: 60px;
	border: 0;
	margin: 8px;
    border-radius: 4px;
    margin: 0;
    display: inline-flex;
    padding: 0;
    position: relative;
    min-width: 0;
    flex-direction: column;
    vertical-align: top;
`;

const Icon = styled(Search)`
    width: 60px;
    padding: 16px;
    position: absolute;
    top: 0px;
	fill: #747474;
`;

const InputWrapper = styled.div`
	position: relative;
	height: 100%;
`;

const Input = styled.input`
	padding: 18.5px 14px 18.5px 60px;
	font: inherit;
    width: 100%;
    border: 0;
    height: 100%;
    margin: 0;
    display: block;
	appearance: none;
	outline: none;
    min-width: 0;
    background: none;
    letter-spacing: inherit;
    -webkit-tap-highlight-color: transparent;
	overflow: hidden;
    text-overflow: ellipsis;
	&::-webkit-calendar-picker-indicator {
		display: none !important;
	}
`;