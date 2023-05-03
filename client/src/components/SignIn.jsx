import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../login/AuthContext';
import { useNavigate } from 'react-router-dom';
/**
     * The sign in function creates the sign in functionalities and manages them
     */
const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      if (String(user.email).endsWith('@tamu.edu')) {
        navigate('/InventoryLevelsEndDayPage');
      } else {
        navigate('/ServerPage');
      }
      console.log("Successfully logged in");
    }
    else {
      navigate('/');
    }
  }, [user]);

  return (
    <div className='emp-signin'>
      <h2 className='empHeader-signin'>Employee Sign In</h2>
      <div>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default SignIn;