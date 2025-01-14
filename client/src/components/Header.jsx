import React, { useContext } from 'react'
import UserContext from './contexts/UserContext'
import ProfileCard from './ProfileCard';
import logo from '../assets/wheekrlogo.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
import '../css/header.css';

function Header() { 
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [avatar, setAvatar] = React.useState('avatar1');
  
  const {user, setUser} = useContext(UserContext);

    
    const handleLoginClose = () => {
        setOpenLogin(false);
    };

    function openLoginModal() {
        setOpenLogin(true);
    }

    const handleSignupClose = () => {
        setOpenSignup(false);
    };

    function openSignupModal() {
        setOpenSignup(true);
    }

    const signup = ()=> {
      const newUser = {
        username: username,
        password: password,
        avatar: avatar
      }
      console.log(newUser)
      axios
        .post('/api/users/register', newUser)
        .then(res => {
          console.log(res)
          setPassword('')
          setUsername('')
          setOpenSignup(false);
          alert('New user created!');
      })
    }

    const login = ()=> {
      const body = {
        username: username,
        password: password
      }
      axios
        .post('/api/users/login', body)
        .then(({ data: user }) => {
          setUser(user);
          setOpenLogin(false);          
          setPassword('')
          setUsername('')
      })
    }

    const handleSignupUsername = (e) => {
      setUsername(e.target.value)
    }
    const handleSignupPassword = (e) => {
      setPassword(e.target.value)
    }

    const handleLoginUsername = (e) => {
      setUsername(e.target.value)
    }

    const handleLoginPassword = (e) => {
      setPassword(e.target.value)
    }

    const handleAvatar = (e) => {
      setAvatar(e.target.value)
    }
    
    return (
      <div className="headerContainer">

      <div className="headerStyle">
        <Link to="/" >
          <img className="logoStyle" src={logo} alt="Logo" />
        </Link>
        {!user? (
          <div className="buttonContainer">

            <Button size="medium" variant="contained" style={buttonStyle} onClick={openLoginModal}>LOGIN</Button>
            <Button size="medium" variant="contained" style={buttonStyle} onClick={openSignupModal}>SIGNUP</Button>

          <Dialog open={openLogin} onClose={handleLoginClose} aria-labelledby="form-dialog-login">
            <DialogTitle id="login">Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                onChange={handleLoginUsername}
                defaultValue={username}
                fullWidth
                />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={handleLoginPassword}
                defaultValue={password}
                fullWidth
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLoginClose} color="primary">
                Go back
                  </Button>
              <Button onClick={login} variant="contained" color="primary">
                Submit
                  </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openSignup} onClose={handleSignupClose} aria-labelledby="form-dialog-signup">
            <DialogTitle id="signup">Signup</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                value={username}
                onChange={handleSignupUsername}
                fullWidth
                />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={handleSignupPassword}
                value={password}
                fullWidth
                />
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose avatar</FormLabel>
                <RadioGroup row aria-label="Avatar" value={avatar} onChange={handleAvatar}>
                  <FormControlLabel 
                    value="avatar1" 
                    control={<Radio />} 
                    labelPlacement="top"
                    label={<img src={'../avatar/avatar1.jpg'} className='avatar' alt='fluffy guinea pig'/>} 
                  />
                  <FormControlLabel 
                    value="avatar2" 
                    control={<Radio />} 
                    labelPlacement="top"
                    label={<img src={'../avatar/avatar2.jpg'} className='avatar' alt='fluffy guinea pig'/>} 
                  />
                  <FormControlLabel 
                    value="avatar3" 
                    control={<Radio />} 
                    labelPlacement="top"
                    label={<img src={'../avatar/avatar3.jpg'} className='avatar' alt='fluffy guinea pig'/>} 
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSignupClose} color="primary">
                Go back
                  </Button>
              <Button onClick={signup} variant="contained" color="primary">
                Register
                  </Button>
            </DialogActions>
          </Dialog>

        </div> ):( 
          <ProfileCard />)}
      </div>
</div>
    )
}

const buttonStyle = {
    color: 'green',
    margin: '1rem'
}

export default Header;