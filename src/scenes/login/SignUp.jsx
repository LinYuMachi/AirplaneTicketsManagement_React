import React, {useEffect, useState} from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip, Alert, // Import Tooltip
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { v4 as uuid } from 'uuid';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import PermissionUtils from "../../utils/PermissionUtils";

const containerStyle = {
  display: 'flex',
  justifyContent: 'flex-end', // Align buttons to the right
};

const generateRandomPassword = () => {
  const length = 12; // Adjust the length as needed
  const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]:;<>,.?~/=-';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
    hasLowercase: false,
    hasMinLength: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isUserNameTouched, setIsUserNameTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // Added state for copy success
  const [componentKey, setComponentKey] = useState(uuid());

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      setIsPasswordTouched(true);
      validatePassword(value);
    } else if (name === 'username') {
      setIsUserNameTouched(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    if (password.trim() === '') {
      setPasswordValidations({
        hasNumber: false,
        hasSpecialChar: false,
        hasUppercase: false,
        hasLowercase: false,
        hasMinLength: false,
      });
      return;
    }

    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/=\\-]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 8;

    setPasswordValidations({
      hasNumber,
      hasSpecialChar,
      hasUppercase,
      hasLowercase,
      hasMinLength,
    });
  };

  const handleGeneratePassword = () => {
    setIsPasswordTouched(true);
    let newPassword;
    let attempts = 0;
    const maxAttempts = 100; // Set a limit to the number of attempts
    while (attempts < maxAttempts) {
      newPassword = generateRandomPassword();
      if (
          newPassword.match(/\d/) &&
          newPassword.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/=\\-]/) &&
          newPassword.match(/[A-Z]/) &&
          newPassword.match(/[a-z]/) &&
          newPassword.length >= 8
      ) {
        break;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        // Exceeded the maximum number of attempts, display an error message
        setError('无法生成符合要求的密码，请手动输入。');
        return;
      }
    }

    setFormData({ ...formData, password: newPassword });
    validatePassword(newPassword);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formData.password);
    setCopySuccess(true); // Set copy success to true
    setTimeout(() => setCopySuccess(false), 3000); // Reset after 3 seconds
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (!formData.username || !formData.password) {
        setLoading(false);
        return;
      }
      await PermissionUtils.signUp(formData.username, formData.password)
      setSuccess('注册成功! 请注意保存密码。');
      setError(null);
    } catch (err) {
      setError(`注册失败。${err?.name ? PermissionUtils.parseError(err.name) : ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container maxWidth="sm" key={componentKey}>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <AccountCircleOutlinedIcon style={{ fontSize: 60 }} />
          <Typography variant="h5" component="h2">
            注册
          </Typography>
        </div>
        <form>
          <TextField
              fullWidth
              margin="normal"
              label="用户名"
              placeholder="请输入用户名"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={isUserNameTouched && !formData.username}
              helperText={isUserNameTouched && !formData.username ? '用户名不能为空' : ''}
              disabled={!!success}
              InputProps={{
                startAdornment: (
                    <AccountCircleOutlinedIcon style={{ marginRight: '8px' }} />
                ),
              }}
          />
          <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!!success}
              error={
                  isPasswordTouched &&
                  (!passwordValidations.hasNumber ||
                      !passwordValidations.hasSpecialChar ||
                      !passwordValidations.hasUppercase ||
                      !passwordValidations.hasLowercase ||
                      !passwordValidations.hasMinLength)
              }
          >
            <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                startAdornment={<LockOutlinedIcon style={{ marginRight: '8px' }} />}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                    >
                      {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                    <Tooltip title="生成密码">
                      <span>
                        <IconButton
                            disabled={!!success}
                            aria-label="generate password"
                            onClick={handleGeneratePassword}
                            edge="end"
                        >
                          <AutorenewOutlinedIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title={copySuccess ? '已复制' : '复制密码'}>
                      <span>
                        <IconButton
                            aria-label="copy to clipboard"
                            onClick={handleCopyToClipboard}
                            edge="end"
                        >
                          {copySuccess ? <CheckCircleOutlinedIcon style={{ color: 'green' }} /> : <ContentCopyOutlinedIcon />}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </InputAdornment>
                }
                label="密码"
                placeholder="请输入密码"
            />
          </FormControl>
          <List>
            {isPasswordTouched && (
                <>
                  <ListItem>
                    <ListItemIcon>
                      {passwordValidations.hasNumber ? (
                          <CheckCircleOutlinedIcon style={{ color: 'green' }} />
                      ) : (
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary='包含至少1个数字'/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {passwordValidations.hasSpecialChar ? (
                          <CheckCircleOutlinedIcon style={{ color: 'green' }} />
                      ) : (
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary='包含至少1个特殊字符'/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {passwordValidations.hasUppercase ? (
                          <CheckCircleOutlinedIcon style={{ color: 'green' }} />
                      ) : (
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary='包含至少1个大写字母'/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {passwordValidations.hasLowercase ? (
                          <CheckCircleOutlinedIcon style={{ color: 'green' }} />
                      ) : (
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary='包含至少1个小写字母'/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {passwordValidations.hasMinLength ? (
                          <CheckCircleOutlinedIcon style={{ color: 'green' }} />
                      ) : (
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary='至少8个字符'/>
                  </ListItem>
                </>
            )}
          </List>
          <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
              disabled={
                  !!success || !formData.username ||
                  formData.password.trim() === '' ||
                  (!passwordValidations.hasNumber ||
                      !passwordValidations.hasSpecialChar ||
                      !passwordValidations.hasUppercase ||
                      !passwordValidations.hasLowercase ||
                      !passwordValidations.hasMinLength) ||
                  loading
              }
          >
            {loading ? (
                <CircularProgress size={24} />
            ) : (
                '注册'
            )}
          </Button>
          {error && (
              <Alert severity="error" style={{ marginTop: '1rem' }}>
                {error}
              </Alert>
          )}
          {success && (
              <>
                <Alert severity="success" style={{ marginTop: '1rem' }}>
                    {success}
                </Alert>
                <div style={containerStyle}>
                  <Button
                      variant="text"
                      color="secondary"
                      startIcon={<RestartAltOutlinedIcon />}
                      onClick={() => window.location.reload()}
                  >
                    开始新注册
                  </Button>
                  <Button variant="text" color="secondary" startIcon={<OpenInNewOutlinedIcon />}>
                    新用户权限管理
                  </Button>
                </div>
              </>
          )}
        </form>
      </Container>
  );
};

export default SignUp;
