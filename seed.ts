const createUser = async (
  id: string,
  username: string,
  password: string,
  role: string,
  language: string
) => {
  return {
    id,
    username,
    password,
    role,
    language,
  };
};

export async function getMockUsers() {
  return Promise.all([
    createUser("1", "user", "password", "user", "cs"),
    createUser("2", "admin", "password", "admin", "en"),
  ]);
}
