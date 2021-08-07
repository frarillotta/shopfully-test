import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

type DrawerProps = {
	openerEl: HTMLElement;
	children?: JSX.Element;
}

export function Drawer({openerEl, children}: DrawerProps) {

	const [isExpanded, setIsExpanded] = useState(false);
	const drawerEl = useRef<HTMLElement>();
	const backdropEl = useRef<HTMLElement>();

	const handleEvent = (e) => {
		if (drawerEl.current?.contains(e.target)) return;
		drawerEl.current.style.transform = 'translateX(-100%)';
		backdropEl.current.style.opacity = '0';
		setTimeout(() => setIsExpanded(!isExpanded), 300);
	};

	useEffect(()=>{
		if (!isExpanded && openerEl) {
			openerEl.addEventListener('click', () => setIsExpanded(true), false);
		}
		if (isExpanded) {
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

	return <>
		{isExpanded && 
			<Wrapper>
				<Backdrop ref={backdropEl}/>
				<Aside id={'drawer'} ref={drawerEl}>
					{children}
				</Aside>
			</Wrapper>
		}
	</>;

};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const Wrapper = styled.div`
    position: fixed;
    z-index: 1300;
    inset: 0px;
`;

const Backdrop = styled.div`
	animation: 1s ${fadeIn} ease-out;
	transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: -1;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const Aside = styled.aside`
	animation: 0.3s ${slideIn} ease-out;
	min-width: 350px;
	width: 22vw;
	background: white;
	transform: none;
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
	left: 0;
    right: auto;
	top: 0;
    flex: 1 0 auto;
    height: 100%;
    display: flex;
    outline: 0;
    z-index: 1200;
    position: fixed;
    overflow-y: auto;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
`;