export const mapUser = (user) => {
  return {
    email: user.email,
    password: user.password,
    role: user.role,
  };
};
