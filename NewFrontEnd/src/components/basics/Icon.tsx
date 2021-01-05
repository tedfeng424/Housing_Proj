// TODO not sure if this is needed yet
import React from 'react';
import { Icon as IconType } from '../../assets/icons/all';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  label?: string;
}

const Icon: React.FC<IconProps> = ({ label }) => {
  return <>label</>;
};

export default Icon;
