import React, { useState } from 'react';
import PermissionUtils from '../../utils/PermissionUtils';
import {
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
} from '@mui/icons-material';

function SignIn() {
  // root bAuW3&.l6MIZ
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('Abcdef123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await PermissionUtils.signIn(username, password);
      setLoading(false);
      setSuccess('登录成功! 页面跳转中...');
      setError('');
    } catch (error) {
      setLoading(false);
      setError(`登录失败。${error?.name ? PermissionUtils.parseError(error.name) : ''}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <AccountCircleOutlinedIcon style={{ fontSize: 60 }} />
        <Typography variant="h5" component="h2">
          登录
        </Typography>
      </div>
      {success && (
        <Alert severity="success" style={{ marginTop: '1rem' }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" style={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      )}
      <form>
        <TextField
          fullWidth
          margin="normal"
          label="用户名"
          placeholder="请输入用户名"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setIsUsernameTouched(true); // Mark as touched when the user starts typing
          }}
          InputProps={{
            startAdornment: (
              <AccountCircleOutlinedIcon style={{ marginRight: '8px' }} />
            ),
          }}
          // Set error and helper text based on whether it's empty and touched
          error={isUsernameTouched && !username}
          helperText={isUsernameTouched && !username ? '用户名不能为空' : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          label="密码"
          placeholder="请输入密码"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsPasswordTouched(true); // Mark as touched when the user starts typing
          }}
          InputProps={{
            startAdornment: (
              <LockOutlinedIcon style={{ marginRight: '8px' }} />
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          // Set error and helper text based on whether it's empty and touched
          error={isPasswordTouched && !password}
          helperText={isPasswordTouched && !password ? '密码不能为空' : ''}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : '登录'}
        </Button>
      </form>
    </Container>
  );
}

export default SignIn;
