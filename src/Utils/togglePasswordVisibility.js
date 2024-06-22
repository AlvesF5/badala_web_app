
export const handleToggle = (type, setType, setIcon, eye, eyeOff) => {
    if (type === 'password') {
      setIcon(eyeOff);
      setType('text');
    } else {
      setIcon(eye);
      setType('password');
    }
  };