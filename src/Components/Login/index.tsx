import { Stack, TextField, Link, PrimaryButton, Text } from '@fluentui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  rootStyles,
  loginStylesClassname,
  stackTokens,
  slideLeft,
  loginHeadingStyles,
  emailInputStyles,
  passwordResetTextStyles,
} from './styles';

const Login: React.FC = () => {
  const history = useHistory();
  const [showEmailDescription, setShowEmailDescription] = useState(true);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPasswordDescription, setShowPasswordDescription] = useState(true);
  const validateEmail = (email: string) => {
    if (email === '') {
      setIsInvalidEmail(false);
      setShowEmailDescription(true);
      return;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const match = re.test(String(email).toLowerCase());
    if (!match) {
      setIsInvalidEmail(true);
      setShowEmailDescription(false);
    } else {
      setIsInvalidEmail(false);
      setShowEmailDescription(true);
    }
  };
  return (
    <Stack styles={rootStyles}>
      <Stack className={loginStylesClassname} tokens={stackTokens}>
        <Text className={slideLeft} styles={loginHeadingStyles}>
          Log in
        </Text>
        <TextField
          styles={emailInputStyles}
          type="email"
          //   onFocus={() => setShowEmailDescription(false)}
          onBlur={(e) => validateEmail((e.target as HTMLInputElement).value)}
          errorMessage={isInvalidEmail ? 'Invalid email' : undefined}
          placeholder={'Email'}
          onChange={e=> setEmail((e.target as HTMLInputElement).value)}
          description={showEmailDescription ? 'Enter your email' : ''}
          underlined
          iconProps={{
            iconName: 'Mail',
          }}
        ></TextField>
        <TextField
          underlined
          //   onFocus={() => setShowPasswordDescription(false)}
          onBlur={(e) => setShowPasswordDescription(e.target.value === '')}
          placeholder={'**********'}
          type="password"
          onChange={e=> setPassword((e.target as HTMLInputElement).value)}
          description={showPasswordDescription ? 'Enter your password' : ''}
          canRevealPassword
          revealPasswordAriaLabel="Show password"
        />
        <Text styles={passwordResetTextStyles}>
          <Link>Forgot Password?</Link>
        </Text>
        <Stack.Item align="end">
          <PrimaryButton onClick={()=> {
            axios.post("http://localhost:3000/auth/login",{
              email,password
            }).then(res => {
              sessionStorage.setItem("authToken", (res.data as any).token);
                history.push('/dashboard');
          })
          }} text="Login" />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

export default Login;
