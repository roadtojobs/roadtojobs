CREATE user:admin
SET
  email = 'admin@sethphat.com',
  username = 'admin',
  password  = crypto::argon2::generate('admin'),
  name = 'Road To Jobs',
  email_verified_at = time::now();

CREATE user:test
SET
  email = 'test@sethphat.com',
  username = 'test',
  password  = crypto::argon2::generate('test'),
  name = 'Road To Jobs Test User',
  email_verified_at = time::now();
