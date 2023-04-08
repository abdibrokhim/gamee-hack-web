import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';


function App() {
  const [gameUrl, setGameUrl] = React.useState('');
  const [gameScore, setGameScore] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState({ message: '', status: '' });


  const apiUrl = "https://tggameehacker-api.ba-students.uz/api/update_score/";
  const apiKey = ""; // get your api_key -> https://tggameehacker-api.ba-students.uz/docs


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
  };


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const Stackbar = () => {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertText.status} sx={{ width: '100%', color: 'white'}}>
              {alertText.message}
          </Alert>
      </Snackbar>
      </Stack>
    );
  };


  const onUpdateScoreClick = async () => {
    console.log(gameUrl);
    console.log(gameScore);

    setLoading(true);

    try {
      let request = `${apiUrl}?api_key=${apiKey}&score=${gameScore}&url=${gameUrl}`;
      console.log('Request:', request);

      fetch(request, 
        { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
              if (data.status === 200) {
                console.log('Success:', data.message);

                setOpen(true);
                setAlertText({ message: data.message, status: 'success' });

              } else if (data.status === 400) {
                console.error('Error:', data.message);
                
                setOpen(true);
                setAlertText({ message: data.message, status: 'error' });
              }
          })
          .catch(error => {
              console.error('Error:', error);
              
              setOpen(true);
              setAlertText({ message: 'Something went wrong', status: 'error' });
          });
      } catch (error) {
          console.error('Error:', error);
          
          setOpen(true);
          setAlertText({ message: 'Something went wrong', status: 'error' });
      }
    
    setLoading(false);

  };


  function handleSubmit(e) {
    e.preventDefault();
  }


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(teal[600]),
    backgroundColor: teal[600],
    padding: '15px 40px',
    marginTop: '40px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: teal[900],
    },
    '&:disabled': {
        backgroundColor: teal[400],
        color: theme.palette.getContrastText(teal[400]),
        cursor: 'not-allowed',
    }
  }));


  return (
    <div 
      className="App"
    >
      <div 
        className="App-header"
      >
        <div 
          className="App-title">
            Telegram Gamee Hack
        </div>
        {open ? Stackbar() : <></>}
        <div 
          className=''
          style={{
            width: '60%',
            marginTop: '60px',
            padding: '40px 40px',
            borderRadius: '5px',
          }}
        >
            <form
              onSubmit={handleSubmit}
            >
              <div 
                className="clear-button"
              >
                <input
                  className='input-border'
                  value={gameUrl}
                  style={{
                    width: '80%',
                    padding: '20px 30px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    resize: 'none',
                    backgroundColor: '#F3F3F8',
                    color: '#040404',
                    outline: 'none',
                  }}
                  placeholder='Enter gamee url here'
                  onChange={(e) => setGameUrl(e.target.value)}
                >
                </input>
                <CloseIcon 
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => setGameUrl('')}
                /> 
              </div>
              <div
                className="clear-button"
              >
                <input
                  className='input-border'
                  value={gameScore}
                  style={{
                    width: '80%',
                    padding: '20px 30px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    resize: 'none',
                    backgroundColor: '#F3F3F8',
                    color: '#040404',
                    outline: 'none',
                  }}
                  placeholder='Enter desired score here'
                  onChange={(e) => setGameScore(e.target.value)}
                >
                </input>
                <CloseIcon 
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => setGameScore('')}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                }}
              >
                <ColorButton 
                  disabled={loading || gameUrl.length === 0 || gameScore.length === 0}
                  variant="contained" 
                  type="submit"
                  onClick={() => onUpdateScoreClick()}
                  >
                    Hack
                </ColorButton>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default App;
