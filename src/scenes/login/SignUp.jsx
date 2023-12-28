import React, {useContext, useEffect, useState} from 'react';
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
  Tooltip, Alert, MenuItem, Checkbox, Select, Divider, Collapse, Autocomplete, // Import Tooltip
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import PermissionUtils from "../../utils/PermissionUtils";
import ObjectUtils from "../../utils/ObjectUtils";
import {ApiContext} from "../../App";
import ExpandableDropdown from "../../components/ExpandableDropdown";

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
  const apiClient = useContext(ApiContext);
  const [children, setChildren] = useState([]);
  useEffect(() => {
    apiClient.listChildren().then(data => setChildren(
        (data?.children ?? []).map((childGroup, i)  =>
            childGroup.map(child => (
                {
                  label: child,
                  id: child,
                  group: `Level ${i}`,
                }
              ))
    ).flat()));
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    parent: '',
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
  const [isTouched, setIsTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    name: false,
    phone: false,
    parent: false,
  });
  const [copySuccess, setCopySuccess] = useState(false); // Added state for copy success

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setIsTouched(ObjectUtils.assignProperty(isTouched, true, name));
    if (name === 'password') {
      validatePassword(value);
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
    setIsTouched(ObjectUtils.assignProperty(isTouched, true, 'password'));
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
      await PermissionUtils.signUp(formData.username, formData.password, formData.name, formData.phone, formData.parent)
      setSuccess('注册成功! 请注意保存密码。');
      setError(null);
    } catch (err) {
      console.log(err);
      setError(`注册失败。${err?.name ? PermissionUtils.parseError(err.name) : ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container maxWidth="sm">
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <AccountCircleOutlinedIcon style={{ fontSize: 60 }} />
          <Typography variant="h5" component="h2">
            注册
          </Typography>
        </div>
        <form>
          <Autocomplete
              required={true}
              options={
                children
              }
              disabled={!!success}
              getOptionLabel={(option) => option.label}
              variant="outlined"
              groupBy={(option) => option.group}
              renderInput={(params) => (
                  // <TextField {...params} label="代理机构*" variant="outlined" error={isTouched.parent && !formData.parent} />
                  <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      label="代理机构"
                      placeholder="请输入代理机构"
                      variant="outlined"
                      name="username"
                      error={isTouched.parent && !formData.parent}
                      helperText={isTouched.parent && !formData.parent ? '代理机构不能为空' : ''}
                      disabled={!!success}
                      required
                  />
              )}
              onChange={(event, newValue) => {
                handleInputChange({target: {name: "parent", value: newValue?.id}});
              }}
          />
          <TextField
              fullWidth
              margin="normal"
              label="用户名"
              placeholder="请输入用户名"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={isTouched.username && !formData.username}
              helperText={isTouched.username && !formData.username ? '用户名不能为空' : ''}
              disabled={!!success}
              InputProps={{
                startAdornment: (
                    <AccountCircleOutlinedIcon style={{ marginRight: '8px' }} />
                ),
              }}
              required
          />
          <TextField
              fullWidth
              margin="normal"
              label="姓名"
              placeholder="请输入姓名"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={isTouched.name && !formData.name}
              helperText={isTouched.name && !formData.name ? '姓名不能为空' : ''}
              disabled={!!success}
              InputProps={{
                startAdornment: (
                    <BadgeOutlinedIcon style={{ marginRight: '8px' }} />
                ),
              }}
              required
          />
          <TextField
              fullWidth
              margin="normal"
              label="手机号"
              placeholder="请输入手机号"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={isTouched.phone && !formData.phone}
              helperText={isTouched.phone && !formData.phone ? '手机号不能为空' : ''}
              disabled={!!success}
              InputProps={{
                startAdornment: (
                    <ContactPhoneOutlinedIcon style={{ marginRight: '8px' }} />
                ),
              }}
              required
          />
          <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={!!success}
              required
              error={
                  isTouched.password &&
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
            {isTouched.password && (
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
          <TextField
              fullWidth
              margin="normal"
              label="确认密码" // Label for the password confirmation field
              placeholder="请再次输入密码"
              variant="outlined"
              name="confirmPassword" // Name for the password confirmation field
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={isTouched.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={isTouched.confirmPassword && formData.password !== formData.confirmPassword ? '密码不一致' : ''}
              disabled={!!success}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                    <LockOutlinedIcon style={{ marginRight: '8px' }} />
                ),
              }}
              required
          />
          <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignUp}
              disabled={
                  !!success || !formData.parent || !formData.username || !formData.phone || !formData.name ||
                  formData.password.trim() === '' ||
                  (!passwordValidations.hasNumber ||
                      !passwordValidations.hasSpecialChar ||
                      !passwordValidations.hasUppercase ||
                      !passwordValidations.hasLowercase ||
                      !passwordValidations.hasMinLength) ||
                  formData.password !== formData.confirmPassword ||
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
