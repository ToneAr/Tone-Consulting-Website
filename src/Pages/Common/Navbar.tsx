import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconButton, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';


interface IPageObjArray {
    page: string;
    key: string;
};
const pageObjectArray: Array<IPageObjArray> = [
    {page:'About',
        key:'About me'
    },
    {page:'Projects',
        key:'Projects'
    },
    {page:'Blog',
        key:'Blog'
    }
];



function Navbar({ colorMode } : {colorMode: any}) {
  
  const navigate = useNavigate();
  const theme = useTheme();

  const [ show, setShow ] = useState<Boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const [ styles, springApi ]  = useSpring(()=>({
      y:0,
    })
  );

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // setShow(false); 
      springApi.start({
        y: -70
      })
    } else { 
      // setShow(true);  
      springApi.start({
        y: 0
      })
    }
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
       window.removeEventListener('scroll', controlNavbar);
    };
  
  }, [lastScrollY]);

  const AnimatedAppBar = animated(AppBar);
  const AnimatedContainer = animated(Container);

  // className={`navbar ${ show && 'hidden' }`}
  return (
    <AnimatedAppBar style={styles}>
      <AnimatedContainer maxWidth="xl" >
        <Toolbar disableGutters  >
          <Link to="/" style={{textDecoration: 'none'}}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              TONE
            </Typography>       
          </Link>

          <Box sx={{ flexGrow: 1, display: {  md: 'flex' } }}>
            
            {pageObjectArray.map((obj) => (

                <Button
                  key={obj.key}
                  onClick={()=>
                    navigate(obj.page)
                  }
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {obj.key}
                </Button>

            ))}

          </Box>
            <Box>

          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          
      </Box>

        </Toolbar>
      </AnimatedContainer>
    </AnimatedAppBar>
  );
}
export default Navbar;