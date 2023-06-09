DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;

DEFINE FIELD email ON TABLE user TYPE string
  ASSERT $value != NONE
  AND is::email($value);

DEFINE FIELD username ON user TYPE string
  ASSERT $value != NONE;

DEFINE FIELD password ON TABLE user TYPE string
  ASSERT $value != NONE
  PERMISSIONS
    FOR update WHERE id = $auth.id
    FOR create, select, delete NONE;

DEFINE FIELD name ON TABLE user TYPE string
  ASSERT $value != NONE;

DEFINE FIELD job_title ON TABLE user TYPE string;
DEFINE FIELD description ON TABLE user TYPE string;
DEFINE FIELD metadata ON TABLE user TYPE object;
DEFINE FIELD locked ON TABLE user TYPE bool VALUE $value OR false
  PERMISSIONS NONE;
DEFINE FIELD created_at ON TABLE user TYPE datetime VALUE $value OR time::now();
DEFINE FIELD updated_at ON TABLE user TYPE datetime VALUE time::now()
  PERMISSIONS NONE;
DEFINE FIELD email_verified_at ON TABLE user TYPE datetime
  PERMISSIONS NONE;
DEFINE FIELD deleted_at ON TABLE user TYPE datetime
  PERMISSIONS NONE;

DEFINE INDEX unq_email ON TABLE user COLUMNS email UNIQUE;
DEFINE INDEX unq_username ON TABLE user COLUMNS username UNIQUE;

DEFINE SCOPE roadtojobsusers
  SESSION 14d
  SIGNUP (
    CREATE user
      SET username = $user,
        email = $email,
        password = crypto::argon2::generate($pass)
  )
  SIGNIN (
    SELECT *
    FROM user
    WHERE
      (username = $user OR email = $user) AND
      crypto::argon2::compare(password, $pass) AND
      email_verified_at != NONE
  )
