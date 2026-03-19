interface HexShapeProps {
  className?: string;
  pathClassName?: string;
}

export default function HexShape({ className, pathClassName }: HexShapeProps) {
  return (
    <svg
      className={className}
      viewBox={"0 0 373 72"}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClassName}
        d={
          "M32.0518 0.5H340.948C344.648 0.500069 348.122 2.27998 350.283 5.2832L372.383 36L350.283 66.7168C348.122 69.72 344.648 71.4999 340.948 71.5H32.0518C28.3519 71.4999 24.8777 69.72 22.7168 66.7168L0.616211 36L22.7168 5.2832C24.8777 2.27998 28.3519 0.500067 32.0518 0.5Z"
        }
      />
    </svg>
  );
}
