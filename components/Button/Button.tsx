import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLAttributeAnchorTarget } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = {
	actionText: string;
	link: string;
	iconLeft?: IconProp;
	iconRight?: IconProp;
	colorScheme?: 'primary' | 'secondary' | 'secondary inverted' | 'primary lightHover';
	target?: HTMLAttributeAnchorTarget;
};

const Button = ({ actionText, link, iconLeft, iconRight, colorScheme = 'primary', target = '_self' }: ButtonProps) => {
	return (
		<a
			className={`${styles.button} ${colorScheme
				.split(' ')
				.map((scheme) => styles[scheme])
				.join(' ')}`}
			href={link}
			target={target}
		>
			{iconLeft && <FontAwesomeIcon icon={iconLeft} />}
			<span>{actionText}</span>
			{iconRight && <FontAwesomeIcon icon={iconRight} />}
		</a>
	);
};

export default Button;
