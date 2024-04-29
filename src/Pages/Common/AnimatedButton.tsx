import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import React from "react";
import { animated, useSpring } from "react-spring";

interface AnimatedButtonProps {
  onClick?: Function 
}

const AnimatedButton: any = (props: any) => {

  const theme = useTheme();
    
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  // const [angle, setAngle] = React.useState<number>(30);

  const bgColor = theme.palette.mode === 'dark' ? '#01010177' : '#fff4';
  
  const borderColor =
    theme.palette.mode === 'dark'
      ? (isHovered || props.isSelected) ? '#777' : '#333' //Dark
      : (isHovered || props.isSelected) ? '#555' : '#aaa' //Light
  
  let isSelected = props.isSelected ?? false;
  const backgroundAnimation = useSpring({
    background:
      `
       
          linear-gradient(
            45deg,
            ${bgColor} ${ isSelected ? -500 : isHovered ? 0 : 0}%,
            ${ theme.palette.mode ==='dark' ? theme.palette.primary.main : theme.palette.primary.light} ${isHovered ? 50 : 0}%,
            ${bgColor} ${ isSelected ? 500 : isHovered ? 100 : 0}%
          )
        
      `,
    // background: theme.palette.mode === 'dark' ? '#1117' : '#e1e1e177',
    borderColor: borderColor,
    config: {
      friction: 30,
    }
  });

  const fontColor = theme.palette.mode === 'dark' ? '#eee' : '#777';
  const fontHoverColor = theme.palette.mode === 'dark' ? '#fff' : '#111';
  const fontAnimation = useSpring({
    color: (isHovered || props.isSelected)  ? fontHoverColor : fontColor
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const AnimatedBox = animated(Box);
  const AnimatedTypography = animated(Typography);

  return (
    <AnimatedBox
      style={{
        display: 'flex',
        borderStyle: 'solid',
        borderWidth: '1px',
        height: 50,
        alignContent: 'center',
        borderRadius: 4,
        backgroundSize: '100% 100%',
        ...backgroundAnimation,
        ...props.style
      }}
    >
      <ButtonBase
        sx={{
          top: 0,
          left: 0,
          px: `10pt`,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          color: theme.palette.secondary.main,
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={props.onClick}
      >
        <AnimatedTypography
          style={{
            ...fontAnimation
          }}
        >
          {props.children}
        </AnimatedTypography>
      </ButtonBase>
    </AnimatedBox>
  );
};

export default AnimatedButton;