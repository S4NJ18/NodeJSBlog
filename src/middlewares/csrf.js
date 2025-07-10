import csrf from 'csurf';

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 24 hours
  }
});

export default csrfProtection;