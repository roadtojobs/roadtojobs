CREATE user
SET
  email = 'admin@sethphat.com',
  username = 'admin',
  password  = crypto::argon2::generate('admin'),
  name = 'Road To Jobs',
  email_verified_at = time::now()

