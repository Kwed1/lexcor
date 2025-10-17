import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import DeleteIcon from '../assets/delete.svg'
import PinoICON from '../assets/icon.jpg'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ErrorSnackbarProps {
    error: string;
    onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ error, onClose }) => {
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
      <Snackbar
      open={error !== ''}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          borderRadius: '35px',
          position: 'absolute',
          top: '2px',
          right: '4px',
        },
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Alert
        icon={false}
        sx={{
          backgroundColor: '#161A1E',
          color: 'white',
          '& .MuiAlert-icon': {
            color: 'white',
          },
        }}
      >
        <div className='flex items-center gap-2'>
          <div>
            <img src={PinoICON} alt='Icon' className='w-[50px] h-[50px] rounded-full'/>
          </div>

          <div className='w-[300px] bg-crypto-danger-bg border-crypto-danger border h-[40px] px-2 flex items-center rounded-xl text-[12px] gap-2 font-medium'>
            <img src={DeleteIcon} alt="X" className='w-[25px] h-[25px]' />
            <p className='mt-[2px] text-crypto-text-primary'>
             {error}
            </p>
          </div>
        </div>
      </Alert>
    </Snackbar>
    );
};

export default ErrorSnackbar;
