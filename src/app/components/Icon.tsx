import Image from 'next/image';
import { IconProps } from '../Types/icons';

export default function Icon({ src = '', alt, size = 20, className = '' }: IconProps) {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={className}
        />
    );
}